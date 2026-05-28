// ========== EXERCISE MANAGER PAGE ==========
let editingDayId = null;
let editingExerciseIdx = null;

function renderExercises() {
    const page = document.getElementById('page-exercises');
    const program = getTrainingProgram();
    const custom = isCustomProgram();

    page.innerHTML = `
        <div class="section-title">🛠️ Exercise Manager</div>

        ${custom ? `
            <div class="card" style="border-left: 3px solid var(--accent-orange); padding: 12px 14px;">
                <div style="font-size:12px; color:var(--accent-orange)">⚠️ You're using a custom program. Changes are saved automatically.</div>
            </div>
        ` : `
            <div class="card" style="border-left: 3px solid var(--accent-green); padding: 12px 14px;">
                <div style="font-size:12px; color:var(--accent-green)">✅ Using the default 4-day Upper/Lower split. Edit any exercise to create your custom version.</div>
            </div>
        `}

        <div id="exerciseDaysList">
            ${program.days.map((day, dayIdx) => `
                <div class="ex-day-card" style="border-left: 3px solid ${day.color}">
                    <div class="ex-day-header">
                        <div>
                            <div class="ex-day-name" style="color:${day.color}">${day.name}</div>
                            <div class="ex-day-info">${day.dayOfWeek} · ${day.exercises.length} exercises</div>
                        </div>
                        <div class="ex-day-actions">
                            <button class="ex-action-btn" onclick="editDay('${day.id}')" title="Edit Day">✏️</button>
                            <button class="ex-action-btn" onclick="deleteDay('${day.id}')" title="Delete Day">🗑️</button>
                        </div>
                    </div>
                    <div class="ex-exercise-list">
                        ${day.exercises.map((ex, exIdx) => `
                            <div class="ex-exercise-item">
                                <div class="ex-exercise-info">
                                    <div class="ex-exercise-name">${ex.name}</div>
                                    <div class="ex-exercise-detail">${ex.sets} × ${ex.repsTarget} · Rest ${ex.rest}</div>
                                    ${ex.notes ? `<div class="ex-exercise-notes">💡 ${ex.notes}</div>` : ''}
                                </div>
                                <div class="ex-exercise-actions">
                                    ${exIdx > 0 ? `<button class="ex-move-btn" onclick="moveExercise('${day.id}', ${exIdx}, -1)" title="Move Up">⬆️</button>` : '<div style="width:32px"></div>'}
                                    ${exIdx < day.exercises.length - 1 ? `<button class="ex-move-btn" onclick="moveExercise('${day.id}', ${exIdx}, 1)" title="Move Down">⬇️</button>` : '<div style="width:32px"></div>'}
                                    <button class="ex-action-btn" onclick="editExercise('${day.id}', ${exIdx})" title="Edit">✏️</button>
                                    <button class="ex-action-btn" onclick="deleteExercise('${day.id}', ${exIdx})" title="Delete">🗑️</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-secondary btn-sm" style="margin-top:8px; width:100%" onclick="addExercise('${day.id}')">
                        ➕ Add Exercise
                    </button>
                </div>
            `).join('')}
        </div>

        <button class="btn btn-success" style="margin-top:16px" onclick="addDay()">
            ➕ Add Training Day
        </button>

        ${custom ? `
            <button class="btn btn-danger" style="margin-top:10px" onclick="resetProgram()">
                🔄 Reset to Default Program
            </button>
        ` : ''}

        <!-- Modal Container -->
        <div id="exModal" class="ex-modal hidden">
            <div class="ex-modal-overlay" onclick="closeExModal()"></div>
            <div class="ex-modal-content">
                <div class="ex-modal-header">
                    <h3 id="exModalTitle">Edit</h3>
                    <button class="ex-modal-close" onclick="closeExModal()">✕</button>
                </div>
                <div id="exModalBody"></div>
            </div>
        </div>
    `;
}

// ==================== DAY MANAGEMENT ====================

function addDay() {
    const program = getTrainingProgram();
    const usedColors = program.days.map(d => d.color);
    const availableColor = DAY_COLORS.find(c => !usedColors.includes(c)) || DAY_COLORS[program.days.length % DAY_COLORS.length];
    
    editingDayId = null;
    openExModal('Add Training Day', `
        <div class="form-group">
            <label class="form-label">Day Name</label>
            <input type="text" id="dayNameInput" class="form-input" placeholder="e.g. Push Day, Arms, etc.">
        </div>
        <div class="form-group">
            <label class="form-label">Day of Week</label>
            <select id="dayOfWeekInput" class="form-input">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Color</label>
            <div class="ex-color-grid">
                ${DAY_COLORS.map(c => `
                    <button class="ex-color-btn ${c === availableColor ? 'selected' : ''}" 
                            style="background:${c}" 
                            onclick="selectColor(this, '${c}')"
                            data-color="${c}"></button>
                `).join('')}
            </div>
            <input type="hidden" id="dayColorInput" value="${availableColor}">
        </div>
        <button class="btn btn-primary" onclick="saveDayForm()">💾 Save Day</button>
    `);
}

function editDay(dayId) {
    const program = getTrainingProgram();
    const day = program.days.find(d => d.id === dayId);
    if (!day) return;

    editingDayId = dayId;
    openExModal('Edit Training Day', `
        <div class="form-group">
            <label class="form-label">Day Name</label>
            <input type="text" id="dayNameInput" class="form-input" value="${day.name}">
        </div>
        <div class="form-group">
            <label class="form-label">Day of Week</label>
            <select id="dayOfWeekInput" class="form-input">
                ${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => 
                    `<option value="${d}" ${d === day.dayOfWeek ? 'selected' : ''}>${d}</option>`
                ).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Color</label>
            <div class="ex-color-grid">
                ${DAY_COLORS.map(c => `
                    <button class="ex-color-btn ${c === day.color ? 'selected' : ''}" 
                            style="background:${c}" 
                            onclick="selectColor(this, '${c}')"
                            data-color="${c}"></button>
                `).join('')}
            </div>
            <input type="hidden" id="dayColorInput" value="${day.color}">
        </div>
        <button class="btn btn-primary" onclick="saveDayForm()">💾 Save Changes</button>
    `);
}

function saveDayForm() {
    const name = document.getElementById('dayNameInput').value.trim();
    const dayOfWeek = document.getElementById('dayOfWeekInput').value;
    const color = document.getElementById('dayColorInput').value;

    if (!name) {
        showToast('Please enter a day name', 'error');
        return;
    }

    const program = getTrainingProgram();
    // Deep copy to avoid mutating default
    const newProgram = JSON.parse(JSON.stringify(program));

    if (editingDayId) {
        // Editing existing day
        const day = newProgram.days.find(d => d.id === editingDayId);
        if (day) {
            day.name = name;
            day.dayOfWeek = dayOfWeek;
            day.color = color;
        }
    } else {
        // Adding new day
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_+$/, '') + '_' + Date.now();
        newProgram.days.push({
            id,
            name,
            dayOfWeek,
            color,
            exercises: []
        });
    }

    saveTrainingProgram(newProgram);
    closeExModal();
    renderExercises();
    showToast(editingDayId ? '✅ Day updated!' : '✅ Day added!');
}

function deleteDay(dayId) {
    const program = getTrainingProgram();
    const day = program.days.find(d => d.id === dayId);
    if (!day) return;

    if (!confirm(`Delete "${day.name}" and all its exercises?\n\nThis cannot be undone.`)) return;

    const newProgram = JSON.parse(JSON.stringify(program));
    newProgram.days = newProgram.days.filter(d => d.id !== dayId);
    saveTrainingProgram(newProgram);
    renderExercises();
    showToast('🗑️ Day deleted');
}

// ==================== EXERCISE MANAGEMENT ====================

function addExercise(dayId) {
    editingDayId = dayId;
    editingExerciseIdx = null;
    
    const program = getTrainingProgram();
    const day = program.days.find(d => d.id === dayId);

    openExModal(`Add Exercise to ${day.name}`, `
        <div class="form-group">
            <label class="form-label">Exercise Name</label>
            <input type="text" id="exNameInput" class="form-input" placeholder="e.g. Bench Press">
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px">
            <div class="form-group">
                <label class="form-label">Sets</label>
                <input type="number" id="exSetsInput" class="form-input" value="3" min="1" max="10" inputmode="numeric">
            </div>
            <div class="form-group">
                <label class="form-label">Rep Target</label>
                <input type="text" id="exRepsInput" class="form-input" placeholder="e.g. 10-12">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Rest Period</label>
            <select id="exRestInput" class="form-input">
                <option value="30s">30 seconds</option>
                <option value="45s">45 seconds</option>
                <option value="60s" selected>60 seconds</option>
                <option value="90s">90 seconds</option>
                <option value="120s">2 minutes</option>
                <option value="180s">3 minutes</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Notes / Coaching Cues (optional)</label>
            <input type="text" id="exNotesInput" class="form-input" placeholder="e.g. Squeeze at the top">
        </div>
        <button class="btn btn-primary" onclick="saveExerciseForm()">💾 Add Exercise</button>
    `);
}

function editExercise(dayId, exIdx) {
    editingDayId = dayId;
    editingExerciseIdx = exIdx;

    const program = getTrainingProgram();
    const day = program.days.find(d => d.id === dayId);
    const ex = day.exercises[exIdx];
    if (!ex) return;

    const restOptions = ['30s', '45s', '60s', '90s', '120s', '180s'];

    openExModal(`Edit Exercise`, `
        <div class="form-group">
            <label class="form-label">Exercise Name</label>
            <input type="text" id="exNameInput" class="form-input" value="${ex.name}">
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px">
            <div class="form-group">
                <label class="form-label">Sets</label>
                <input type="number" id="exSetsInput" class="form-input" value="${ex.sets}" min="1" max="10" inputmode="numeric">
            </div>
            <div class="form-group">
                <label class="form-label">Rep Target</label>
                <input type="text" id="exRepsInput" class="form-input" value="${ex.repsTarget}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Rest Period</label>
            <select id="exRestInput" class="form-input">
                ${restOptions.map(r => `<option value="${r}" ${r === ex.rest ? 'selected' : ''}>${r === '120s' ? '2 minutes' : r === '180s' ? '3 minutes' : r.replace('s', ' seconds')}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Notes / Coaching Cues (optional)</label>
            <input type="text" id="exNotesInput" class="form-input" value="${ex.notes || ''}">
        </div>
        <button class="btn btn-primary" onclick="saveExerciseForm()">💾 Save Changes</button>
    `);
}

function saveExerciseForm() {
    const name = document.getElementById('exNameInput').value.trim();
    const sets = parseInt(document.getElementById('exSetsInput').value) || 3;
    const repsTarget = document.getElementById('exRepsInput').value.trim() || '10-12';
    const rest = document.getElementById('exRestInput').value;
    const notes = document.getElementById('exNotesInput').value.trim();

    if (!name) {
        showToast('Please enter an exercise name', 'error');
        return;
    }

    const program = getTrainingProgram();
    const newProgram = JSON.parse(JSON.stringify(program));
    const day = newProgram.days.find(d => d.id === editingDayId);
    if (!day) return;

    const exercise = { name, sets, repsTarget, rest, notes };

    if (editingExerciseIdx !== null) {
        day.exercises[editingExerciseIdx] = exercise;
    } else {
        day.exercises.push(exercise);
    }

    saveTrainingProgram(newProgram);
    closeExModal();
    renderExercises();
    showToast(editingExerciseIdx !== null ? '✅ Exercise updated!' : '✅ Exercise added!');
}

function deleteExercise(dayId, exIdx) {
    const program = getTrainingProgram();
    const day = program.days.find(d => d.id === dayId);
    const ex = day.exercises[exIdx];

    if (!confirm(`Delete "${ex.name}"?`)) return;

    const newProgram = JSON.parse(JSON.stringify(program));
    const newDay = newProgram.days.find(d => d.id === dayId);
    newDay.exercises.splice(exIdx, 1);
    saveTrainingProgram(newProgram);
    renderExercises();
    showToast('🗑️ Exercise deleted');
}

function moveExercise(dayId, exIdx, direction) {
    const program = getTrainingProgram();
    const newProgram = JSON.parse(JSON.stringify(program));
    const day = newProgram.days.find(d => d.id === dayId);
    
    const newIdx = exIdx + direction;
    if (newIdx < 0 || newIdx >= day.exercises.length) return;

    // Swap
    const temp = day.exercises[exIdx];
    day.exercises[exIdx] = day.exercises[newIdx];
    day.exercises[newIdx] = temp;

    saveTrainingProgram(newProgram);
    renderExercises();
}

// ==================== RESET ====================

function resetProgram() {
    if (!confirm('Reset to the default 4-day Upper/Lower split?\n\nYour custom exercises will be lost.')) return;
    if (!confirm('Are you sure? This cannot be undone.')) return;
    
    resetTrainingProgram();
    renderExercises();
    showToast('🔄 Program reset to defaults');
}

// ==================== MODAL ====================

function openExModal(title, bodyHtml) {
    document.getElementById('exModalTitle').textContent = title;
    document.getElementById('exModalBody').innerHTML = bodyHtml;
    document.getElementById('exModal').classList.remove('hidden');
    // Focus first input
    setTimeout(() => {
        const firstInput = document.querySelector('#exModalBody input[type="text"]');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeExModal() {
    document.getElementById('exModal').classList.add('hidden');
    editingDayId = null;
    editingExerciseIdx = null;
}

function selectColor(btn, color) {
    document.querySelectorAll('.ex-color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('dayColorInput').value = color;
}
