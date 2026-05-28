// ========== LOCAL STORAGE MANAGER ==========
const Storage = {
    PREFIX: 'flt_',

    get(key, defaultValue = null) {
        try {
            const val = localStorage.getItem(this.PREFIX + key);
            return val ? JSON.parse(val) : defaultValue;
        } catch { return defaultValue; }
    },

    set(key, value) {
        try { localStorage.setItem(this.PREFIX + key, JSON.stringify(value)); } 
        catch (e) { console.error('Storage error:', e); }
    },

    remove(key) { localStorage.removeItem(this.PREFIX + key); },

    // ===== WEIGH-INS =====
    getWeighIns() { return this.get('weighins', []); },

    saveWeighIn(entry) {
        const entries = this.getWeighIns();
        // Check if entry for this date exists
        const idx = entries.findIndex(e => e.date === entry.date);
        if (idx >= 0) entries[idx] = entry;
        else entries.push(entry);
        entries.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.set('weighins', entries);
        return entries;
    },

    deleteWeighIn(date) {
        let entries = this.getWeighIns();
        entries = entries.filter(e => e.date !== date);
        this.set('weighins', entries);
        return entries;
    },

    // ===== GYM LOGS =====
    getGymLogs() { return this.get('gymlogs', []); },

    saveGymLog(log) {
        const logs = this.getGymLogs();
        // Find existing log for same date + day
        const idx = logs.findIndex(l => l.date === log.date && l.dayId === log.dayId);
        if (idx >= 0) logs[idx] = log;
        else logs.push(log);
        logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.set('gymlogs', logs);
        return logs;
    },

    deleteGymLog(date, dayId) {
        let logs = this.getGymLogs();
        logs = logs.filter(l => !(l.date === date && l.dayId === dayId));
        this.set('gymlogs', logs);
        return logs;
    },

    getGymLogsForDay(dayId) {
        return this.getGymLogs().filter(l => l.dayId === dayId);
    },

    getLatestGymLog(dayId) {
        const logs = this.getGymLogsForDay(dayId);
        return logs.length > 0 ? logs[0] : null;
    },

    getPreviousGymLog(dayId, currentDate) {
        const logs = this.getGymLogsForDay(dayId);
        return logs.find(l => l.date < currentDate) || null;
    },

    // ===== PERSONAL RECORDS =====
    getPRs() { return this.get('prs', {}); },

    checkAndUpdatePR(exerciseName, weight, reps) {
        const prs = this.getPRs();
        const volume = weight * reps;
        const key = exerciseName;
        const current = prs[key];
        let newPR = false;

        if (!current || volume > (current.bestWeight * current.bestReps)) {
            prs[key] = {
                bestWeight: weight,
                bestReps: reps,
                bestVolume: volume,
                date: new Date().toISOString().split('T')[0]
            };
            newPR = true;
        }
        this.set('prs', prs);
        return newPR;
    },

    // ===== SETTINGS =====
    getSettings() {
        return this.get('settings', {
            startDate: new Date().toISOString().split('T')[0],
            startWeight: CLIENT_PROFILE.startWeight,
            goalWeight: CLIENT_PROFILE.goalWeight,
            weeklyTarget: CLIENT_PROFILE.weeklyRateLoss,
            units: 'lbs'
        });
    },

    saveSettings(settings) { this.set('settings', settings); },

    // ===== PROJECTED WEIGHT =====
    getProjectedWeight(weekNumber) {
        const settings = this.getSettings();
        return Math.max(settings.goalWeight, settings.startWeight - (weekNumber * settings.weeklyTarget));
    },

    getWeekNumber(date) {
        const settings = this.getSettings();
        const start = new Date(settings.startDate);
        const target = new Date(date);
        const diffMs = target - start;
        return Math.max(0, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)));
    },

    // ===== EXPORT / IMPORT =====
    exportAll() {
        const data = {
            weighins: this.getWeighIns(),
            gymlogs: this.getGymLogs(),
            prs: this.getPRs(),
            settings: this.getSettings(),
            customProgram: this.get('custom_program', null),
            exportDate: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    },

    importAll(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.weighins) this.set('weighins', data.weighins);
            if (data.gymlogs) this.set('gymlogs', data.gymlogs);
            if (data.prs) this.set('prs', data.prs);
            if (data.settings) this.set('settings', data.settings);
            if (data.customProgram) {
                this.set('custom_program', data.customProgram);
            }
            return true;
        } catch { return false; }
    },

    clearAll() {
        Object.keys(localStorage)
            .filter(k => k.startsWith(this.PREFIX))
            .forEach(k => localStorage.removeItem(k));
    }
};
