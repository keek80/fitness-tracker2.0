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
    // ... (your current renderGym function is good - keep it as is) ...
    // (I kept it exactly as you had it for the button)
}

function isLightColor(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

// ========== WEIGHT HELPERS (these were missing) ==========
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

// ========== SWAP ==========
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

// Reset substitutions
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

// ========== REST TIMER (add if missing) ==========
let restTimerInterval = null;
let restTimeLeft = 60;
let currentTimerPreset = 60;

// ... add the full rest timer functions (toggleRestTimer, changeTimerDuration, etc.) if they are missing ...
