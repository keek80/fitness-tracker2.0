    // ========== GYM LOG PAGE ==========
let currentGymDay = null;
let currentGymDate = getLocalDateString();
let autoSelectedDay = false;
let currentSubstitutions = {}; // {originalName: substituteName} for this session only

const DAY_NAME_MAP = {
    0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday',
    4: 'Thursday', 5: 'Friday', 6: 'Saturday'
};

function getTodaysWorkout(dateStr) {
    const program = getTrainingProgram();
    if (!program.days || program.days.length === 0) return null;
    const date = new Date(dateStr + 'T12:00:00');
    const dayOfWeek = DAY_NAME_MAP[date.getDay()];
    const match = program.days.find(d => d.dayOfWeek === dayOfWeek);
    return match ? match.id : null;
}

function isToday(dateStr) {
    return dateStr === getLocalDateString();
}

function renderGym() {
    const page = document.getElementById('page-gym');
    const program = getTrainingProgram();

    const todaysWorkout = getTodaysWorkout(currentGymDate);

    if (!currentGymDay || !program.days.find(d => d.id === currentGymDay)) {
        if (todaysWorkout) {
            currentGymDay = todaysWorkout;
            autoSelectedDay = true;
        } else {
            currentGymDay = program.days.length > 0 ? program.days[0].id : null;
            autoSelectedDay = false;
        }
    }

    if (!currentGymDay || program.days.length === 0) {
        page.innerHTML = `
            <div class="section-title">💪 Gym Log</div>
            <div class="empty-state">
                <div class="empty-icon">🏋️</div>
                <p>No training days set up yet.</p>
                <button class="btn btn-primary btn-sm" style="margin-top:12px; width:auto" onclick="navigate('exercises')">🛠️ Set Up Exercises</button>
            </div>
        `;
        return;
    }

    const day = program.days.find(d => d.id === currentGymDay);
    const existingLog = Storage.getGymLogs().find(l => l.date === currentGymDate && l.dayId === currentGymDay);
    const previousLog = Storage.getPreviousGymLog(currentGymDay, currentGymDate);
    const prs = Storage.getPRs();

    const selectedDate = new Date(currentGymDate + 'T12:00:00');
    const selectedDayName = DAY_NAME_MAP[selectedDate.getDay()];
    const isTodayDate = isToday(currentGymDate);
    const isScheduledDay = todaysWorkout === currentGymDay;
    let scheduleIndicator = '';

    if (isTodayDate && isScheduledDay && todaysWorkout) {
        scheduleIndicator = `<div class="today-workout-banner"><span class="today-badge">📅 TODAY</span><span>It's ${selectedDayName} — <strong>${day.name}</strong> is scheduled!</span></div>`;
    } else if (isTodayDate && !todaysWorkout) {
        scheduleIndicator = `<div class="rest-day-banner"><span class="rest-badge">😴 REST DAY</span><span>It's ${selectedDayName} — no workout scheduled. But you can still log one!</span></div>`;
    } else if (!isTodayDate) {
        scheduleIndicator = `<div class="past-date-banner"><span>📆 Logging for <strong>${formatDate(currentGymDate)}</strong> (${selectedDayName})</span></div>`;
    }

    page.innerHTML = `
        <div class="section-title">💪 Log Workout</div>
        <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" id="gymDate" class="form-input" value="${currentGymDate}" onchange="onGymDateChange(this.value)">
        </div>
        ${scheduleIndicator}
        <div class="day-selector">
            ${program.days.map(d => {
                const isActive = d.id === currentGymDay;
                const isScheduled = d.id === todaysWorkout && isTodayDate;
                return `<button class="day-btn ${isActive ? 'active' : ''} ${isScheduled && !isActive ? 'scheduled' : ''}" 
                        style="${isActive ? 'background:' + d.color + '; border-color:' + d.color + '; color:' + (isLightColor(d.color) ? '#000' : '#fff') : ''}"
                        onclick="selectGymDay('${d.id}')">
                    ${d.dayOfWeek.slice(0,3)}<br><span style="font-size:10px">${d.name}</span>
                    ${isScheduled ? '<span class="day-today-dot"></span>' : ''}
                </button>`;
            }).join('')}
        </div>

        <div class="card" style="border-left: 3px solid ${day.color}; padding: 12px 14px;">
            <div style="font-size:14px; font-weight:600; color:${day.color}">${day.name}</div>
            <div style="font-size:12px; color:var(--text-muted)">${day.dayOfWeek} — ${day.exercises.length} exercises</div>
        </div>

        <div id="exerciseList">
            ${day.exercises.map((ex, i) => {
                const displayName = currentSubstitutions[ex.name] || ex.name;
                const isSubstituted = !!currentSubstitutions[ex.name];

                const saved = existingLog?.exercises?.find(e => (e.originalName || e.name) === ex.name);
                const prev = previousLog?.exercises?.find(e => (e.originalName || e.name) === ex.name);
                const pr = prs[ex.name];

                const prBadge = pr ? `<span class="pr-badge">🏆 PR: ${pr.bestWeight} lbs</span>` : '';

                const prevWeights = prev ? (prev.weights || (prev.weight ? Array((prev.sets || []).length || ex.sets).fill(prev.weight) : [])) : [];
                const prevSets = prev ? (prev.sets || []) : [];

                const isAutoLoaded = !saved && prevWeights.some(w => w > 0);

                const savedWeights = saved?.weights ? saved.weights : saved?.weight ? Array(ex.sets).fill(saved.weight) : Array.from({length: ex.sets}, (_, si) => prevWeights[si] !== undefined && prevWeights[si] > 0 ? prevWeights[si] : '');
                const savedReps = saved?.sets || Array(ex.sets).fill('');

                let prevDisplay = '';
                if (prev) {
                    const prevParts = prevSets.map((r, si) => {
                        const w = prevWeights[si] || 0;
                        return r > 0 ? `${w > 0 ? w + 'lb×' : ''}${r}` : null;
                    }).filter(Boolean);
                    if (prevParts.length > 0) {
                        const prevMaxW = prevWeights.length > 0 ? Math.max(...prevWeights.filter(w => w > 0)) : 0;
                        prevDisplay = `<div class="prev-session-info"><span class="prev-label">Last session:</span><span class="prev-sets">${prevParts.join(' · ')}</span>${prevMaxW > 0 && saved ? `<button class="fill-btn" onclick="fillFromPrevious(${i}, [${prevWeights.join(',')}], [${prevSets.join(',')}])" title="Load previous session">⬆️ Load</button>` : ''}</div>`;
                    }
                }

                return `
                <div class="exercise-card">
                    <div class="exercise-name" style="${isSubstituted ? 'color:var(--accent-orange);' : ''}">
                        ${displayName} ${prBadge}
                        <button class="ex-action-btn" onclick="swapExercise(${i}, '${ex.name}')" style="float:right; font-size:18px;" title="Swap for this session">🔄</button>
                    </div>
                    <div class="exercise-target">${ex.sets} × ${ex.repsTarget} · Rest ${ex.rest}${ex.notes ? ' · ' + ex.notes : ''}</div>
                    ${prevDisplay}
                    ${isAutoLoaded ? `<div style="font-size:11px; color:var(--accent-orange); margin-bottom:8px; padding:5px 10px; background:rgba(255,170,0,0.08); border-radius:6px; border:1px solid rgba(255,170,0,0.25);">⬆️ Weights pre-loaded from last session — enter your reps below</div>` : ''}
                    <div class="per-set-grid">
                        <div class="per-set-header"><span>SET</span><span>WEIGHT (lbs)</span><span>REPS</span></div>
                        ${Array.from({length: ex.sets}, (_, s) => `
                            <div class="per-set-row">
                                <div class="set-num-badge">${s + 1}</div>
                                <input type="number" class="set-input gym-weight" data-idx="${i}" data-set="${s}" value="${savedWeights[s] || ''}" placeholder="lbs" inputmode="decimal" onchange="onWeightChange(${i}, ${s})">
                                <input type="number" class="set-input gym-reps" data-idx="${i}" data-set="${s}" value="${savedReps[s] || ''}" placeholder="${ex.repsTarget.split('-')[0] || '—'}" inputmode="numeric">
                            </div>
                        `).join('')}
                    </div>
                    <button class="fill-down-btn" onclick="fillWeightsDown(${i}, ${ex.sets})" title="Copy Set 1 weight to all sets">↓ Apply Set 1 weight to all sets</button>
                    <div class="notes-row">
                        <input type="text" class="notes-input gym-notes" data-idx="${i}" value="${saved?.notes || ''}" placeholder="Notes for this exercise...">
                    </div>
                </div>`;
            }).join('')}
        </div>

        <div style="margin-top:12px"><button class="btn btn-secondary" onclick="viewGymHistory()">📋 History</button></div>

        <div id="gymHistorySection" class="hidden" style="margin-top:12px">
            <div class="section-title" style="font-size:16px; margin-bottom:10px;">📋 ${day.name} History</div>
            <div id="gymHistoryList"></div>
        </div>

        <!-- Save Button -->
        <div style="position:fixed; bottom:85px; left:16px; z-index:99999; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <div id="save-workout-btn" onclick="saveGymLog()" style="background:#00d68f; color:#000; width:82px; height:82px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-direction:column; box-shadow:0 10px 35px rgba(0,214,143,0.85); cursor:pointer; border:6px solid white; user-select:none; transition: transform 0.2s;">
                <span style="font-size:28px; line-height:1;">💾</span>
                <span style="font-size:11px; font-weight:900; line-height:1.5;">Save</span>
            </div>
        </div>

        <!-- Rest Timer -->
        <div style="position:fixed; bottom:85px; right:16px; z-index:99999; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <select id="timer-preset" onchange="changeTimerDuration(parseInt(this.value))" style="background:#1e2937; color:white; border:2px solid #475569; border-radius:9999px; padding:8px 16px; font-size:14px; min-width:130px;">
                <option value="30">30s</option>
                <option value="60" selected>60s</option>
                <option value="90">90s</option>
                <option value="120">2min</option>
                <option value="180">3min</option>
            </select>
            <div id="rest-timer" onclick="toggleRestTimer()" style="background:#00d4ff; color:#000; width:82px; height:82px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:900; box-shadow:0 10px 35px rgba(0,212,255,0.85); cursor:pointer; border:6px solid white; user-select:none;">60</div>
        </div>
    `;
}

// ========== SWAP EXERCISE ==========
function swapExercise(exIdx, originalName) {
    window.tempSwapOriginal = originalName;
    navigate('exercises');  // Ensure picker DOM is loaded
    
    setTimeout(() => {
        if (typeof openExercisePicker === 'function') {
            openExercisePicker();
            window.tempOnSelectExercise = selectExerciseForSwap;
        }
    }, 400);
}

// ========== SAVE WITH SUBSTITUTIONS ==========
function saveGymLog() {
    const day = getTrainingProgram().days.find(d => d.id === currentGymDay);
    if (!day) return;

    const exercisesData = day.exercises.map((ex) => {
        const subName = currentSubstitutions[ex.name] || ex.name;
        // Collect inputs (same logic as before)
        const weights = Array.from(document.querySelectorAll(`.gym-weight[data-idx="${day.exercises.indexOf(ex)}"]`)).map(el => parseFloat(el.value) || 0);
        const reps = Array.from(document.querySelectorAll(`.gym-reps[data-idx="${day.exercises.indexOf(ex)}"]`)).map(el => parseInt(el.value) || 0);
        const notesEl = document.querySelector(`.gym-notes[data-idx="${day.exercises.indexOf(ex)}"]`);
        const notes = notesEl ? notesEl.value.trim() : '';

        return { name: subName, originalName: ex.name, weights, sets: reps, notes };
    });

    const log = {
        date: currentGymDate,
        dayId: currentGymDay,
        dayName: day.name,
        exercises: exercisesData,
        substitutions: {...currentSubstitutions}
    };

    Storage.saveGymLog(log);
    showToast('✅ Workout saved!');
    currentSubstitutions = {};
    renderGym();
}
function isLightColor(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
// Reset substitutions on date/day change
function onGymDateChange(newDate) {
    currentGymDate = newDate;
    currentSubstitutions = {};
    renderGym();
}

function selectGymDay(dayId) {
    currentGymDay = dayId;
    currentSubstitutions = {};
    renderGym();
}
// ========== TEMPORARY EXERCISE SWAP ==========
function swapExercise(exIdx, originalName) {
    window.tempSwapOriginal = originalName;
    if (typeof openExercisePicker === 'function') {
        openExercisePicker();
        window.tempOnSelectExercise = selectExerciseForSwap;
    } else {
        showToast('Go to Exercise Manager once to load the picker', 'error');
    }
}

function selectExerciseForSwap(newName) {
    if (!window.tempSwapOriginal) return;
    currentSubstitutions[window.tempSwapOriginal] = newName;
    showToast(`✅ Swapped to ${newName} for this session`, 'success');
    renderGym();
    delete window.tempSwapOriginal;
}

// Make sure these reset substitutions
function onGymDateChange(newDate) {
    currentGymDate = newDate;
    currentSubstitutions = {};
    renderGym();
}

function selectGymDay(dayId) {
    currentGymDay = dayId;
    currentSubstitutions = {};
    renderGym();
}

// ========== KEEP ALL YOUR EXISTING HELPER FUNCTIONS BELOW ==========
// onWeightChange, fillWeightsDown, fillFromPrevious, viewGymHistory, deleteGymLog, 
// isLightColor, rest timer functions, etc. — copy them from your previous version if missing.
