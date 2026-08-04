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
                // Prefer same-day previous session; fall back to last time this exercise was logged anywhere
                const prevFromDay = previousLog?.exercises?.find(e => (e.originalName || e.name) === ex.name);
                const lastAny = !prevFromDay
                    ? Storage.getLastExerciseLog(displayName, currentGymDate)
                        || Storage.getLastExerciseLog(ex.name, currentGymDate)
                    : null;

                const prevWeights = prevFromDay
                    ? (prevFromDay.weights || (prevFromDay.weight ? Array((prevFromDay.sets || []).length || ex.sets).fill(prevFromDay.weight) : []))
                    : (lastAny ? lastAny.weights : []);
                const prevSets = prevFromDay
                    ? (prevFromDay.sets || [])
                    : (lastAny ? lastAny.reps : []);
                const prevDateLabel = prevFromDay
                    ? (previousLog?.date || '')
                    : (lastAny ? lastAny.date : '');

                const pr = prs[ex.name] || prs[displayName];
                const prBadge = pr ? `<span class="pr-badge">🏆 PR: ${pr.bestWeight} lbs</span>` : '';

                const videoUrl = getExerciseVideo(displayName) || getExerciseVideo(ex.name);
                const videoBtn = videoUrl
                    ? `<button class="ex-action-btn" onclick="openVideo('${videoUrl}')" title="Watch form">▶️</button>`
                    : '';

                const numericPrevWeights = prevWeights.map(w => Number(w) || 0);
                const lastWeightShown = numericPrevWeights.filter(w => w > 0);
                const lastWeightMax = lastWeightShown.length ? Math.max(...lastWeightShown) : 0;

                // Fill empty weight fields from last session when today is not already saved
                const isAutoLoaded = !saved && lastWeightShown.length > 0;
                const savedWeights = saved?.weights
                    ? saved.weights
                    : saved?.weight
                        ? Array(ex.sets).fill(saved.weight)
                        : Array.from({ length: ex.sets }, (_, si) =>
                            numericPrevWeights[si] > 0 ? numericPrevWeights[si] : ''
                          );
                const savedReps = saved?.sets || Array(ex.sets).fill('');

                let prevDisplay = '';
                if (lastWeightMax > 0 || prevSets.some(r => Number(r) > 0)) {
                    const parts = [];
                    const n = Math.max(numericPrevWeights.length, prevSets.length, ex.sets);
                    for (let si = 0; si < n; si++) {
                        const w = numericPrevWeights[si] || 0;
                        const r = Number(prevSets[si]) || 0;
                        if (w > 0 || r > 0) {
                            parts.push(`${w > 0 ? w + ' lb' : '—'}${r > 0 ? ' × ' + r : ''}`);
                        }
                    }
                    const loadBtn = (lastWeightMax > 0 || prevSets.some(r => Number(r) > 0))
                        ? `<button class="fill-btn" type="button"
                                onclick="fillFromPrevious(${i}, [${numericPrevWeights.join(',')}], [${prevSets.map(r => Number(r) || 0).join(',')}])"
                                title="Load last weights & reps">⬆️ Load</button>`
                        : '';

                    prevDisplay = `
                        <div class="prev-session-info">
                            <span class="prev-label">Last${prevDateLabel ? ' (' + formatDateShort(prevDateLabel) + ')' : ''}:</span>
                            <span class="prev-sets">${parts.join(' · ') || (lastWeightMax + ' lb')}</span>
                            ${loadBtn}
                        </div>`;
                }

                return `
                <div class="exercise-card">
                    <div class="exercise-name" style="${isSubstituted ? 'color:var(--accent-orange);' : ''}">
                        ${displayName} ${prBadge} ${videoBtn}
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
                                 <input type="number" class="set-input gym-weight" data-idx="${i}" data-set="${s}"
                                       value="${savedWeights[s] || ''}"
                                       placeholder="${numericPrevWeights[s] > 0 ? numericPrevWeights[s] : (lastWeightMax > 0 ? lastWeightMax : 'lbs')}"
                                       inputmode="decimal" onchange="onWeightChange(${i}, ${s})">
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
            <select id="timer-preset" onchange="changeTimerDuration(parseInt(this.value, 10))"
                    style="background:#1e2937; color:white; border:2px solid #475569; border-radius:9999px; padding:8px 16px; font-size:14px; min-width:130px;">
                <option value="15"  ${currentTimerPreset === 15  ? 'selected' : ''}>15s</option>
                <option value="30"  ${currentTimerPreset === 30  ? 'selected' : ''}>30s</option>
                <option value="45"  ${currentTimerPreset === 45  ? 'selected' : ''}>45s</option>
                <option value="60"  ${currentTimerPreset === 60  ? 'selected' : ''}>60s</option>
                <option value="90"  ${currentTimerPreset === 90  ? 'selected' : ''}>90s</option>
                <option value="120" ${currentTimerPreset === 120 ? 'selected' : ''}>2min</option>
                <option value="180" ${currentTimerPreset === 180 ? 'selected' : ''}>3min</option>
            </select>
            <div id="rest-timer" onclick="toggleRestTimer()"
                 style="background:#00d4ff; color:#000; width:82px; height:82px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:900; box-shadow:0 10px 35px rgba(0,212,255,0.85); cursor:pointer; border:6px solid white; user-select:none;">
                ${restTimerInterval ? restTimeLeft : currentTimerPreset}
            </div>
        </div>
    `;
}

// ========== WEIGHT HELPERS ==========
function onWeightChange(exIdx, setIdx) {
    if (setIdx !== 0) return;
    const set1Input = document.querySelector(`.gym-weight[data-idx="${exIdx}"][data-set="0"]`);
    if (!set1Input || !set1Input.value) return;

    let s = 1;
    while (true) {
        const el = document.querySelector(`.gym-weight[data-idx="${exIdx}"][data-set="${s}"]`);
        if (!el) break;
        if (!el.value) el.value = set1Input.value;
        s++;
    }
}

function fillWeightsDown(exIdx, numSets) {
    const set1 = document.querySelector(`.gym-weight[data-idx="${exIdx}"][data-set="0"]`);
    if (!set1 || !set1.value) {
        showToast('Enter Set 1 weight first', 'error');
        return;
    }
    for (let s = 1; s < numSets; s++) {
        const el = document.querySelector(`.gym-weight[data-idx="${exIdx}"][data-set="${s}"]`);
        if (el) el.value = set1.value;
    }
}

function fillFromPrevious(exIdx, prevWeights, prevReps) {
    prevWeights.forEach((w, s) => {
        const wEl = document.querySelector(`.gym-weight[data-idx="${exIdx}"][data-set="${s}"]`);
        if (wEl && w > 0) wEl.value = w;
    });
    prevReps.forEach((r, s) => {
        const rEl = document.querySelector(`.gym-reps[data-idx="${exIdx}"][data-set="${s}"]`);
        if (rEl) rEl.value = r;
    });
}

// ========== SAVE WITH SUBSTITUTIONS ==========
function saveGymLog() {
    const day = getTrainingProgram().days.find(d => d.id === currentGymDay);
    if (!day) return;

    const exercisesData = day.exercises.map((ex, i) => {
        const subName = currentSubstitutions[ex.name] || ex.name;
        const weights = Array.from(document.querySelectorAll(`.gym-weight[data-idx="${i}"]`)).map(el => parseFloat(el.value) || 0);
        const reps = Array.from(document.querySelectorAll(`.gym-reps[data-idx="${i}"]`)).map(el => parseInt(el.value) || 0);
        const notesEl = document.querySelector(`.gym-notes[data-idx="${i}"]`);
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

// ========== SWAP EXERCISE ==========
function swapExercise(exIdx, originalName) {
    window.tempSwapOriginal = originalName;
    navigate('exercises');
    setTimeout(() => {
        if (typeof openExercisePicker === 'function') {
            openExercisePicker();
            window.tempOnSelectExercise = selectExerciseForSwap;
        }
    }, 400);
}

function selectExerciseForSwap(newName) {
    if (!window.tempSwapOriginal) return;
    currentSubstitutions[window.tempSwapOriginal] = newName;
    showToast(`✅ Swapped to ${newName}`, 'success');
    renderGym();
    delete window.tempSwapOriginal;
}

// ========== DATE / DAY CHANGE ==========
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

// ========== REST TIMER ==========
let restTimerInterval = null;
let currentTimerPreset = parseInt(localStorage.getItem('flt_rest_timer_preset') || '60', 10);
let restTimeLeft = currentTimerPreset;

function playRingingSound() {
    if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 300]);
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gain.gain.setValueAtTime(0.8, audioContext.currentTime);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        setTimeout(() => oscillator.stop(audioContext.currentTime + 0.8), 600);
    } catch (e) {}
}

function startRestTimer() {
    if (restTimerInterval) clearInterval(restTimerInterval);
    const timerEl = document.getElementById('rest-timer');
    if (!timerEl) return;
    timerEl.classList.remove('paused');
    timerEl.textContent = restTimeLeft;

    restTimerInterval = setInterval(() => {
        restTimeLeft--;
        if (timerEl) timerEl.textContent = restTimeLeft;
        if (restTimeLeft <= 0) {
            clearInterval(restTimerInterval);
            restTimerInterval = null;
            if (timerEl) {
                timerEl.textContent = '✓';
                timerEl.classList.add('paused');
            }
            playRingingSound();
            setTimeout(() => {
                if (timerEl) {
                    restTimeLeft = currentTimerPreset;
                    timerEl.textContent = restTimeLeft;
                    timerEl.classList.remove('paused');
                }
            }, 1500);
        }
    }, 1000);
}

function toggleRestTimer() {
    const timerEl = document.getElementById('rest-timer');
    if (!timerEl) return;
    if (restTimerInterval) {
        clearInterval(restTimerInterval);
        restTimerInterval = null;
        timerEl.classList.add('paused');
        timerEl.textContent = '⏸';
    } else {
        if (restTimeLeft <= 0) restTimeLeft = currentTimerPreset;
        startRestTimer();
    }
}

function changeTimerDuration(seconds) {
    currentTimerPreset = seconds;
    restTimeLeft = seconds;
    localStorage.setItem('flt_rest_timer_preset', String(seconds));

    const timerEl = document.getElementById('rest-timer');
    if (timerEl) timerEl.textContent = seconds;

    if (restTimerInterval) {
        clearInterval(restTimerInterval);
        restTimerInterval = null;
        startRestTimer();
    }
}

function cleanupWorkoutTimer() {
    if (restTimerInterval) {
        clearInterval(restTimerInterval);
        restTimerInterval = null;
    }
}

// ========== HELPERS ==========
function isLightColor(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
