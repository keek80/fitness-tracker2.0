// ========== GYM LOG PAGE ==========
let currentGymDay = null;
let currentGymDate = new Date().toISOString().split('T')[0];
let autoSelectedDay = false;

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
    return dateStr === new Date().toISOString().split('T')[0];
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
                const saved = existingLog?.exercises?.[i];
                const pr = prs[ex.name];
                const prBadge = pr ? `<span class="pr-badge">🏆 PR: ${pr.bestWeight} lbs</span>` : '';

                const prev = previousLog?.exercises?.find(e => e.name === ex.name);

                let prevDisplay = '';
                let prevWeights = [];
                let prevSets = [];

                if (prev) {
                    prevWeights = prev.weights || (prev.weight ? Array((prev.sets || []).length || ex.sets).fill(prev.weight) : []);
                    prevSets = prev.sets || [];

                    const prevParts = prevSets.map((r, si) => {
                        const w = prevWeights[si] || 0;
                        return r > 0 ? `${w > 0 ? w + 'lb×' : ''}${r}` : null;
                    }).filter(Boolean);

                    if (prevParts.length > 0) {
                        prevDisplay = `
                            <div class="prev-session-info">
                                <span class="prev-label">Last session:</span>
                                <span class="prev-sets">${prevParts.join(' · ')}</span>
                            </div>`;
                    }
                }

                const isAutoLoaded = !saved && prevWeights.some(w => w > 0);

                const savedWeights = saved?.weights
                    ? saved.weights
                    : saved?.weight
                        ? Array(ex.sets).fill(saved.weight)
                        : Array.from({length: ex.sets}, (_, si) =>
                            prevWeights[si] !== undefined && prevWeights[si] > 0 ? prevWeights[si] : '');

                const savedReps = saved?.sets || Array(ex.sets).fill('');

                return `
                <div class="exercise-card">
                    <div class="exercise-name">${ex.name} ${prBadge}</div>
                    <div class="exercise-target">${ex.sets} × ${ex.repsTarget} · Rest ${ex.rest}${ex.notes ? ' · ' + ex.notes : ''}</div>
                    ${prevDisplay}

                    ${isAutoLoaded ? `
                    <div style="font-size:11px; color:var(--accent-orange); margin-bottom:8px; padding:5px 10px;
                                background:rgba(255,170,0,0.08); border-radius:6px;
                                border:1px solid rgba(255,170,0,0.25);">
                        ⬆️ Weights pre-loaded from last session — enter your reps below
                    </div>` : ''}

                    <div class="per-set-grid">
                        <div class="per-set-header">
                            <span>SET</span>
                            <span>WEIGHT (lbs)</span>
                            <span>REPS</span>
                        </div>
                        ${Array.from({length: ex.sets}, (_, s) => `
                            <div class="per-set-row">
                                <div class="set-num-badge">${s + 1}</div>
                                <input type="number"
                                       class="set-input gym-weight"
                                       data-idx="${i}" data-set="${s}"
                                       value="${savedWeights[s] || ''}"
                                       placeholder="lbs"
                                       inputmode="decimal"
                                       onchange="onWeightChange(${i}, ${s})">
                                <input type="number"
                                       class="set-input gym-reps"
                                       data-idx="${i}" data-set="${s}"
                                       value="${savedReps[s] || ''}"
                                       placeholder="${ex.repsTarget.split('-')[0] || '—'}"
                                       inputmode="numeric">
                            </div>
                        `).join('')}
                    </div>

                    <button class="fill-down-btn" onclick="fillWeightsDown(${i}, ${ex.sets})" title="Copy Set 1 weight to all sets">
                        ↓ Apply Set 1 weight to all sets
                    </button>

                    <div class="notes-row">
                        <input type="text" class="notes-input gym-notes" data-idx="${i}"
                               value="${saved?.notes || ''}" placeholder="Notes for this exercise...">
                    </div>
                </div>`;
            }).join('')}
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:12px">
            <button class="btn btn-primary" onclick="saveGymLog()">💾 Save Workout</button>
            <button class="btn btn-secondary" onclick="viewGymHistory()">📋 History</button>
        </div>

        <!-- Simple Rest Timer - Side by Side Layout (No Overlap) -->
        <div style="position:fixed; bottom:85px; right:16px; z-index:99999; display:flex; align-items:center; gap:12px;">
            
            <!-- Dropdown -->
            <select id="timer-preset" onchange="changeTimerDuration(parseInt(this.value))" 
                    style="background:#1e2937; color:white; border:2px solid #475569; border-radius:9999px; 
                           padding:8px 16px; font-size:14px; min-width:130px; z-index:100001;">
                <option value="30">30s</option>
                <option value="60" selected>60s</option>
                <option value="90">90s</option>
                <option value="120">2min</option>
                <option value="180">3min</option>
            </select>
            
            <!-- Big Rest Timer Circle -->
            <div id="rest-timer" onclick="toggleRestTimer()" 
                 style="background:#00d4ff; color:#000; width:82px; height:82px; border-radius:50%; 
                        display:flex; align-items:center; justify-content:center; font-size:32px; 
                        font-weight:900; box-shadow:0 10px 35px rgba(0,212,255,0.85); 
                        cursor:pointer; border:6px solid white; user-select:none;">
                60
            </div>
        </div>
    `;

    // Initialize Rest Timer
    cleanupWorkoutTimer();
}

// (Rest of the file remains the same - weight helpers, save, history, etc.)

// ========== WEIGHT HELPERS, DATE/DAY, SAVE, HISTORY, HELPERS (same as before) ==========
function onWeightChange(exIdx, setIdx) { /* ... */ }
function fillWeightsDown(exIdx, numSets) { /* ... */ }
function onGymDateChange(newDate) { /* ... */ }
function selectGymDay(dayId) { /* ... */ }
function saveGymLog() { /* ... */ }
function viewGymHistory() { /* ... */ }
function deleteGymLog(date, dayId) { /* ... */ }
function isLightColor(hex) { /* ... */ }

// ========== SIMPLE REST TIMER ==========
let restTimerInterval = null;
let restTimeLeft = 60;
let currentTimerPreset = 60;

function playRingingSound() { /* ... */ }
function startRestTimer() { /* ... */ }
function toggleRestTimer() { /* ... */ }
function changeTimerDuration(seconds) { /* ... */ }

function cleanupWorkoutTimer() {
    if (restTimerInterval) {
        clearInterval(restTimerInterval);
        restTimerInterval = null;
    }
}
