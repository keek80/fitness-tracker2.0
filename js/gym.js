// ========== GYM LOG PAGE ==========

let currentGymDay = null;
let currentGymDate = new Date().toISOString().split('T')[0];
let autoSelectedDay = false;

const DAY_NAME_MAP = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, ''');
}

function getTodaysWorkout(dateStr) {
  const program = getTrainingProgram();

  if (!program.days || program.days.length === 0) {
    return null;
  }

  const date = new Date(`${dateStr}T12:00:00`);
  const dayOfWeek = DAY_NAME_MAP[date.getDay()];
  const match = program.days.find((d) => d.dayOfWeek === dayOfWeek);

  return match ? match.id : null;
}

function isToday(dateStr) {
  return dateStr === new Date().toISOString().split('T')[0];
}

function renderGym() {
  const page = document.getElementById('page-gym');
  if (!page) return;

  const program = getTrainingProgram();
  const todaysWorkout = getTodaysWorkout(currentGymDate);

  if (!currentGymDay || !program.days.find((d) => d.id === currentGymDay)) {
    if (todaysWorkout) {
      currentGymDay = todaysWorkout;
      autoSelectedDay = true;
    } else {
      currentGymDay = program.days.length > 0 ? program.days[0].id : null;
      autoSelectedDay = false;
    }
  }

  if (!currentGymDay || !program.days || program.days.length === 0) {
    page.innerHTML = `
      <div class="page-section">
        <h2>Gym Log</h2>
        <div class="card">
          <p>No training days set up yet.</p>
          <button class="btn btn-primary" onclick="renderExercises()">
            Set Up Exercises
          </button>
        </div>
      </div>
    `;
    return;
  }

  const day = program.days.find((d) => d.id === currentGymDay);
  if (!day) return;

  const existingLog = Storage.getGymLogs().find(
    (l) => l.date === currentGymDate && l.dayId === currentGymDay
  );

  const previousLog = Storage.getPreviousGymLog(currentGymDay, currentGymDate);
  const prs = Storage.getPRs();

  const selectedDate = new Date(`${currentGymDate}T12:00:00`);
  const selectedDayName = DAY_NAME_MAP[selectedDate.getDay()];
  const isTodayDate = isToday(currentGymDate);
  const isScheduledDay = todaysWorkout === currentGymDay;

  let scheduleIndicator = '';

  if (isTodayDate && isScheduledDay && todaysWorkout) {
    scheduleIndicator = `
      <div class="card mb-3">
        <strong>Today:</strong> It's ${escapeHtml(selectedDayName)} — ${escapeHtml(day.name)} is scheduled!
      </div>
    `;
  } else if (isTodayDate && !todaysWorkout) {
    scheduleIndicator = `
      <div class="card mb-3">
        <strong>Rest Day:</strong> It's ${escapeHtml(selectedDayName)} — no workout scheduled, but you can still log one.
      </div>
    `;
  } else if (!isTodayDate) {
    scheduleIndicator = `
      <div class="card mb-3">
        Logging for ${escapeHtml(formatDate(currentGymDate))} (${escapeHtml(selectedDayName)})
      </div>
    `;
  }

  page.innerHTML = `
    <div class="page-section">
      <h2>Log Workout</h2>

      <div class="card mb-3">
        <label for="gymDate"><strong>Date</strong></label>
        <input
          id="gymDate"
          type="date"
          value="${escapeHtml(currentGymDate)}"
          onchange="onGymDateChange(this.value)"
        />
      </div>

      ${scheduleIndicator}

      <div class="day-tabs mb-3">
        ${program.days
          .map((d) => {
            const isActive = d.id === currentGymDay;
            const isScheduled = d.id === todaysWorkout && isTodayDate;

            return `
              <button
                class="btn ${isActive ? 'btn-primary' : 'btn-secondary'}"
                onclick="selectGymDay('${escapeHtml(d.id)}')"
              >
                ${escapeHtml(d.dayOfWeek.slice(0, 3))} · ${escapeHtml(d.name)}${isScheduled ? ' ✓' : ''}
              </button>
            `;
          })
          .join('')}
      </div>

      <div class="card mb-3">
        <h3>${escapeHtml(day.name)}</h3>
        <p>${escapeHtml(day.dayOfWeek)} — ${day.exercises.length} exercises</p>
      </div>

      ${day.exercises
        .map((ex, i) => {
          const saved = existingLog?.exercises?.[i];
          const prev = previousLog?.exercises?.find((e) => e.name === ex.name);
          const pr = prs[ex.name];

          const prBadge = pr ? `<span class="badge">PR: ${escapeHtml(pr.bestWeight)} lbs</span>` : '';

          const prevWeights = prev
            ? (prev.weights || (prev.weight
                ? Array((prev.sets || []).length || ex.sets).fill(prev.weight)
                : []))
            : [];

          const prevSets = prev ? (prev.sets || []) : [];
          const isAutoLoaded = !saved && prevWeights.some((w) => w > 0);

          const savedWeights = saved?.weights
            ? saved.weights
            : saved?.weight
              ? Array(ex.sets).fill(saved.weight)
              : Array.from({ length: ex.sets }, (_, si) =>
                  prevWeights[si] !== undefined && prevWeights[si] > 0 ? prevWeights[si] : ''
                );

          const savedReps = saved?.sets || Array(ex.sets).fill('');

          let prevDisplay = '';
          if (prev) {
            const prevParts = prevSets
              .map((r, si) => {
                const w = prevWeights[si] || 0;
                return r > 0 ? `${w > 0 ? `${w}lb×` : ''}${r}` : null;
              })
              .filter(Boolean);

            if (prevParts.length > 0) {
              prevDisplay = `
                <div class="text-muted mb-2">
                  Last session: ${escapeHtml(prevParts.join(' · '))}
                </div>
              `;
            }
          }

          return `
            <div class="card mb-3">
              <div class="flex justify-between items-center mb-2">
                <h4>${escapeHtml(ex.name)} ${prBadge}</h4>
              </div>

              <div class="text-muted mb-2">
                ${escapeHtml(ex.sets)} sets × ${escapeHtml(ex.repsTarget)} reps · Rest ${escapeHtml(ex.rest)}${ex.notes ? ` · ${escapeHtml(ex.notes)}` : ''}
              </div>

              ${prevDisplay}

              ${isAutoLoaded ? `
                <div class="card mb-2">
                  Weights pre-loaded from last session — enter your reps below.
                </div>
              ` : ''}

              <div class="gym-set-grid">
                <div class="gym-set-grid-header"><strong>Set</strong></div>
                <div class="gym-set-grid-header"><strong>Weight (lbs)</strong></div>
                <div class="gym-set-grid-header"><strong>Reps</strong></div>

                ${Array.from({ length: ex.sets }, (_, s) => `
                  <div>${s + 1}</div>
                  <div>
                    <input
                      type="number"
                      inputmode="decimal"
                      class="gym-weight"
                      data-idx="${i}"
                      data-set="${s}"
                      value="${savedWeights[s] ?? ''}"
                      ${s === 0 ? `oninput="onWeightChange(${i}, ${s})"` : ''}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      inputmode="numeric"
                      class="gym-reps"
                      data-idx="${i}"
                      data-set="${s}"
                      value="${savedReps[s] ?? ''}"
                    />
                  </div>
                `).join('')}
              </div>

              <div class="mt-2">
                <button
                  class="btn btn-secondary"
                  onclick="fillWeightsDown(${i}, ${ex.sets})"
                >
                  ↓ Apply Set 1 weight to all sets
                </button>
              </div>

              <div class="mt-2">
                <label><strong>Notes</strong></label>
                <textarea
                  class="gym-notes"
                  data-idx="${i}"
                  rows="2"
                  placeholder="Optional notes"
                >${escapeHtml(saved?.notes || '')}</textarea>
              </div>
            </div>
          `;
        })
        .join('')}

      <div class="flex gap-2 mb-3">
        <button class="btn btn-secondary" onclick="viewGymHistory()">History</button>
        <button class="btn btn-primary" onclick="saveGymLog()">Save</button>
      </div>

      <!-- FIX: these elements are required by viewGymHistory() -->
      <div id="gymHistorySection" class="hidden mb-3">
        <div class="card">
          <h3>Workout History</h3>
          <div id="gymHistoryList"></div>
        </div>
      </div>

      <div class="card">
        <h3>Rest Timer</h3>
        <div class="flex gap-2 mb-2 rest-timer-controls">
          <button class="btn btn-secondary" onclick="changeTimerDuration(30)">30s</button>
          <button class="btn btn-secondary" onclick="changeTimerDuration(60)">60s</button>
          <button class="btn btn-secondary" onclick="changeTimerDuration(90)">90s</button>
          <button class="btn btn-secondary" onclick="changeTimerDuration(120)">2min</button>
          <button class="btn btn-secondary" onclick="changeTimerDuration(180)">3min</button>
        </div>

        <button id="rest-timer" class="btn btn-primary" onclick="toggleRestTimer()">60</button>
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
    if (rEl && r > 0) rEl.value = r;
  });

  showToast('Previous session loaded');
}

// ========== DATE / DAY CHANGE ==========

function onGymDateChange(newDate) {
  currentGymDate = newDate;

  const todaysWorkout = getTodaysWorkout(newDate);
  if (todaysWorkout) {
    currentGymDay = todaysWorkout;
    autoSelectedDay = true;
  } else {
    autoSelectedDay = false;
  }

  renderGym();
}

function selectGymDay(dayId) {
  currentGymDay = dayId;
  autoSelectedDay = false;
  renderGym();
}

// ========== SAVE ==========

function saveGymLog() {
  const program = getTrainingProgram();
  const day = program.days.find((d) => d.id === currentGymDay);
  if (!day) return;

  const allPRsBefore = Storage.getPRs();
  const prevBestWeights = {};

  day.exercises.forEach((ex) => {
    prevBestWeights[ex.name] = allPRsBefore[ex.name]?.bestWeight || 0;
  });

  const exercises = day.exercises.map((ex, i) => {
    const notesEl = document.querySelector(`.gym-notes[data-idx="${i}"]`);
    const notes = notesEl?.value || '';

    const weights = [];
    const sets = [];

    for (let s = 0; s < ex.sets; s++) {
      const wEl = document.querySelector(`.gym-weight[data-idx="${i}"][data-set="${s}"]`);
      const rEl = document.querySelector(`.gym-reps[data-idx="${i}"][data-set="${s}"]`);

      weights.push(parseFloat(wEl?.value) || 0);
      sets.push(parseInt(rEl?.value) || 0);
    }

    return {
      name: ex.name,
      weights,
      sets,
      notes
    };
  });

  const log = {
    date: currentGymDate,
    dayId: currentGymDay,
    dayName: day.name,
    exercises,
    bodyWeight: Storage.getWeighIns().slice(-1)[0]?.weight || null
  };

  Storage.saveGymLog(log);

  const allPRsAfter = Storage.getPRs();
  const newPRExercises = day.exercises.filter((ex) => {
    const newBest = allPRsAfter[ex.name]?.bestWeight || 0;
    return newBest > prevBestWeights[ex.name];
  });

  if (newPRExercises.length === 1) {
    const ex = newPRExercises[0];
    showToast(`New PR! ${ex.name}: ${allPRsAfter[ex.name].bestWeight} lbs`);
  } else if (newPRExercises.length > 1) {
    showToast(`${newPRExercises.length} New PRs this session!`);
  } else {
    showToast('Workout saved!');
  }

  renderGym();

  if (document.getElementById('page-dashboard')) {
    try {
      renderDashboard();
    } catch (e) {
      // no-op
    }
  }
}

// ========== HISTORY ==========

function viewGymHistory() {
  const section = document.getElementById('gymHistorySection');
  const list = document.getElementById('gymHistoryList');

  if (!section || !list) {
    showToast('History view is unavailable', 'error');
    return;
  }

  section.classList.toggle('hidden');

  if (section.classList.contains('hidden')) {
    return;
  }

  const logs = Storage.getGymLogsForDay(currentGymDay);

  if (!logs || logs.length === 0) {
    list.innerHTML = `
      <p>No sessions logged yet for this day.</p>
    `;
    return;
  }

  list.innerHTML = logs
    .slice(0, 8)
    .map((log) => `
      <div class="card mb-2">
        <div class="flex justify-between items-center mb-2">
          <strong>${escapeHtml(formatDate(log.date))}</strong>
          <button
            class="btn btn-danger btn-sm"
            onclick="deleteGymLog('${escapeHtml(log.date)}', '${escapeHtml(log.dayId)}')"
          >
            Delete
          </button>
        </div>

        ${log.exercises
          .map((ex) => {
            const weightsArr = ex.weights || (ex.weight ? Array((ex.sets || []).length).fill(ex.weight) : []);
            const hasData =
              weightsArr.some((w) => w > 0) ||
              (ex.sets || []).some((s) => s > 0);

            if (!hasData) return '';

            const setParts = (ex.sets || [])
              .map((r, s) => {
                const w = weightsArr[s] || 0;
                return r > 0 ? `${w > 0 ? `${w}×` : ''}${r}` : null;
              })
              .filter(Boolean);

            return `
              <div class="mb-1">
                <span><strong>${escapeHtml(ex.name)}:</strong> ${escapeHtml(setParts.join(' · '))}${ex.notes ? ` — ${escapeHtml(ex.notes)}` : ''}</span>
              </div>
            `;
          })
          .join('')}
      </div>
    `)
    .join('');
}

function deleteGymLog(date, dayId) {
  if (confirm('Delete this workout log?')) {
    Storage.deleteGymLog(date, dayId);
    showToast('Workout deleted');
    renderGym();
  }
}

// ========== HELPERS ==========

function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

// ========== SIMPLE REST TIMER ==========

let restTimerInterval = null;
let restTimeLeft = 60;
let currentTimerPreset = 60;

function playRingingSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startTime = audioContext.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(620, startTime);
    gain.gain.setValueAtTime(0.7, startTime);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.frequency.setValueAtTime(880, startTime + 0.1);
    oscillator.frequency.setValueAtTime(620, startTime + 0.4);

    setTimeout(() => {
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.9);
      oscillator.stop(audioContext.currentTime + 1.3);
    }, 900);
  } catch (e) {
    if (navigator.vibrate) navigator.vibrate([120, 80, 180, 80, 120]);
  }
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
      }, 2200);
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
    if (restTimeLeft <= 0) {
      restTimeLeft = currentTimerPreset;
    }
    startRestTimer();
  }
}

function changeTimerDuration(seconds) {
  currentTimerPreset = seconds;
  restTimeLeft = seconds;

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
