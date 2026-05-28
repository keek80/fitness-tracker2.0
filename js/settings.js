// ========== SETTINGS PAGE ==========
function renderSettings() {
    const page = document.getElementById('page-settings');
    const settings = Storage.getSettings();
    const weighIns = Storage.getWeighIns();
    const gymLogs = Storage.getGymLogs();

    page.innerHTML = `
        <div class="section-title">⚙️ Settings</div>
        
        <div class="card">
            <div class="card-title mb-12">Profile</div>
            <div class="form-group">
                <label class="form-label">Start Date</label>
                <input type="date" id="settStartDate" class="form-input" value="${settings.startDate}">
            </div>
            <div class="form-group">
                <label class="form-label">Start Weight (lbs)</label>
                <input type="number" id="settStartWeight" class="form-input" value="${settings.startWeight}" step="0.1">
            </div>
            <div class="form-group">
                <label class="form-label">Goal Weight (lbs)</label>
                <input type="number" id="settGoalWeight" class="form-input" value="${settings.goalWeight}" step="0.1">
            </div>
            <div class="form-group">
                <label class="form-label">Weekly Loss Target (lbs/week)</label>
                <input type="number" id="settWeeklyTarget" class="form-input" value="${settings.weeklyTarget}" step="0.1">
            </div>
            <button class="btn btn-primary" onclick="saveSettingsForm()">💾 Save Settings</button>
        </div>

        <div class="section-title">💾 Data Management</div>
        <div class="card">
            <div style="font-size:13px; color:var(--text-secondary); margin-bottom:12px">
                📊 ${weighIns.length} weigh-ins · 💪 ${gymLogs.length} workouts · 🏆 ${Object.keys(Storage.getPRs()).length} PRs
            </div>
            <div style="display:grid; gap:10px">
                <button class="btn btn-secondary" onclick="exportData()">📤 Export All Data (JSON)</button>
                <button class="btn btn-secondary" onclick="document.getElementById('importFile').click()">📥 Import Data</button>
                <input type="file" id="importFile" accept=".json" style="display:none" onchange="importData(event)">
                <button class="btn btn-danger" onclick="clearAllData()">🗑️ Clear All Data</button>
            </div>
        </div>

        <div class="section-title">📱 Install App</div>
        <div class="card" style="font-size:13px; color:var(--text-secondary); line-height:1.6">
            <div style="font-weight:600; color:var(--text-primary); margin-bottom:8px">Add to Home Screen</div>
            <div><strong>Chrome (Android):</strong></div>
            <div style="padding-left:12px; margin-bottom:8px">
                1. Tap the ⋮ menu (three dots)<br>
                2. Select "Add to Home Screen"<br>
                3. Tap "Add"
            </div>
            <div><strong>Safari (iOS):</strong></div>
            <div style="padding-left:12px">
                1. Tap the Share button (box with arrow)<br>
                2. Select "Add to Home Screen"<br>
                3. Tap "Add"
            </div>
        </div>

        <div class="section-title">ℹ️ About</div>
        <div class="card" style="font-size:13px; color:var(--text-secondary); text-align:center">
            <div style="font-size:36px; margin-bottom:8px">🏋️</div>
            <div style="font-weight:600; color:var(--text-primary)">Fat Loss Transformation Tracker</div>
            <div>385 → 250 lbs · 18-24 months</div>
            <div style="margin-top:8px; font-size:11px; color:var(--text-muted)">All data stored locally on your device.<br>No account needed. No data sent anywhere.</div>
        </div>
    `;
}

function saveSettingsForm() {
    const settings = {
        startDate: document.getElementById('settStartDate').value,
        startWeight: parseFloat(document.getElementById('settStartWeight').value),
        goalWeight: parseFloat(document.getElementById('settGoalWeight').value),
        weeklyTarget: parseFloat(document.getElementById('settWeeklyTarget').value),
        units: 'lbs'
    };
    Storage.saveSettings(settings);
    showToast('✅ Settings saved!');
    renderDashboard();
}

function exportData() {
    const json = Storage.exportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fat-loss-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📤 Data exported!');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const success = Storage.importAll(e.target.result);
        if (success) {
            showToast('📥 Data imported successfully!');
            renderSettings();
            renderDashboard();
        } else {
            showToast('❌ Invalid backup file', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function clearAllData() {
    if (confirm('⚠️ This will delete ALL your data (weigh-ins, workouts, PRs). This cannot be undone.\n\nAre you sure?')) {
        if (confirm('Really delete everything? Consider exporting a backup first.')) {
            Storage.clearAll();
            showToast('Data cleared');
            renderSettings();
            renderDashboard();
        }
    }
}
