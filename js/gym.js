// ========== GYM LOG PAGE ==========
let currentGymDay = null;
let currentGymDate = getLocalDateString();
let autoSelectedDay = false;
let currentSubstitutions = {}; // Temporary swaps for this session only

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
        scheduleIndicator = `
            <div class="today-workout-banner">
                <span class="today-badge">📅 TODAY</span>
                <span>It's ${selectedDayName} — <strong>${day.name}</strong> is scheduled!</span>
            </div>`;
    } else if (isTodayDate && !todaysWorkout) {
        scheduleIndicator = `
            <div class="rest-day-banner">
                <span class="rest-badge">😴 REST DAY</span>
                <span>It's ${selectedDayName} — no workout scheduled. But you can still log one!</span>
            </div>`;
    } else if (!isTodayDate) {
        scheduleIndicator = `
            <div class="past-date-banner">
                <span>📆 Logging for <strong>${formatDate(currentGymDate)}</strong> (${selectedDayName})</span>
            </div>`;
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
                return `
                <button class="day-btn ${isActive ? 'active' : ''} ${isScheduled && !isActive ? 'scheduled' : ''}" 
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

                // ... (rest of the per-set rendering stays mostly the same - abbreviated here for brevity)
                const prevWeights = prev ? (prev.weights || (prev.weight ? Array((prev.sets || []).length || ex.sets).fill(prev.weight) : [])) : [];
                const prevSets = prev ? (prev.sets || []) : [];

                const isAutoLoaded = !saved && prevWeights.some(w => w > 0);

                const savedWeights = saved?.weights || (saved?.weight ? Array(ex.sets).fill(saved.weight) : Array.from({length: ex.sets}, (_, si) => prevWeights[si] !== undefined && prevWeights[si] > 0 ? prevWeights[si] : ''));
                const savedReps = saved?.sets || Array(ex.sets).fill('');

                let prevDisplay = '';
                if (prev) {
                    // ... existing prev display logic ...
                }

                return `
                <div class="exercise-card">
                    <div class="exercise-name" style="${isSubstituted ? 'color:var(--accent-orange);' : ''}">
                        ${displayName}
                        ${isSubstituted ? `<small style="color:var(--accent-orange)"> (sub for ${ex.name})</small>` : ''}
                        <button class="ex-action-btn" onclick="swapExercise(${i}, '${ex.name}')" style="float:right;font-size:18px;margin-left:8px;" title="Swap exercise for this session only">🔄</button>
                    </div>
                    <div class="exercise-target">${ex.sets} × ${ex.repsTarget} · Rest ${ex.rest}${ex.notes ? ' · ' + ex.notes : ''}</div>
                    ${prevDisplay}

                    ${isAutoLoaded ? `...` : ''}

                    <div class="per-set-grid">
                        <!-- Existing per-set inputs remain unchanged -->
                        <div class="per-set-header">
                            <span>SET</span><span>WEIGHT (lbs)</span><span>REPS</span>
                        </div>
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

        <div style="margin-top:12px">
            <button class="btn btn-secondary" onclick="viewGymHistory()">📋 History</button>
        </div>

        <!-- Save button and timer remain the same -->
        <div style="position:fixed; bottom:85px; left:16px; z-index:99999; ..."> ... existing save button ... </div>
        <!-- Rest timer section remains unchanged -->
    `;
}

// ========== NEW SWAP FUNCTIONALITY ==========
function swapExercise(exIdx, originalName) {
    window.tempSwapOriginal = originalName;
    window.tempSwapIdx = exIdx;
    
    // Reuse Exercise Database picker from exercises.js
    if (typeof openExercisePicker === 'function') {
        openExercisePicker();
        // Temporarily override selection handler (defined in exercises.js)
        window.tempOnSelectExercise = selectExerciseForSwap;
    } else {
        showToast('Exercise database not loaded. Try navigating to Exercise Manager first.', 'error');
    }
}

function selectExerciseForSwap(newName) {
    if (!window.tempSwapOriginal) return;
    
    currentSubstitutions[window.tempSwapOriginal] = newName;
    showToast(`✅ Replaced with ${newName}`, 'success');
    renderGym();
    
    // Cleanup
    delete window.tempSwapOriginal;
    delete window.tempSwapIdx;
}

// ========== UPDATED SAVE FUNCTION ==========
function saveGymLog() {
    const day = getTrainingProgram().days.find(d => d.id === currentGymDay);
    if (!day) return;

    const exercisesData = day.exercises.map((ex, i) => {
        const substitutedName = currentSubstitutions[ex.name] || ex.name;
        
        const weights = [];
        const reps = [];
        document.querySelectorAll(`.gym-weight[data-idx="${i}"]`).forEach(input => {
            weights.push(parseFloat(input.value) || 0);
        });
        document.querySelectorAll(`.gym-reps[data-idx="${i}"]`).forEach(input => {
            reps.push(parseInt(input.value) || 0);
        });

        const notesInput = document.querySelector(`.gym-notes[data-idx="${i}"]`);
        const notes = notesInput ? notesInput.value.trim() : '';

        return {
            name: substitutedName,
            originalName: ex.name,           // Keep reference to original
            weights: weights,
            sets: reps,
            notes: notes
        };
    });

    const log = {
        date: currentGymDate,
        dayId: currentGymDay,
        dayName: day.name,
        exercises: exercisesData,
        substitutions: { ...currentSubstitutions }  // Save for history/reference
    };

    Storage.saveGymLog(log);
    showToast('✅ Workout saved!');
    
    // Reset substitutions for next session
    currentSubstitutions = {};
    renderGym();
}

// Existing functions (onGymDateChange, selectGymDay, etc.) - update to reset substitutions
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

// ... (keep all the rest of your original functions: onWeightChange, fillWeightsDown, fillFromPrevious, viewGymHistory, deleteGymLog, helpers, timer, etc. unchanged) ...
