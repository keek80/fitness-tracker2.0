// ========== LOCAL STORAGE MANAGER (+ Supabase Sync) ==========
// localStorage = instant reads, works offline
// SupabaseSync = cloud backup, fires async after every write
function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

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
        const idx = entries.findIndex(e => e.date === entry.date);
        if (idx >= 0) entries[idx] = entry;
        else entries.push(entry);
        entries.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.set('weighins', entries);
        // Sync to cloud
        if (typeof SupabaseSync !== 'undefined') SupabaseSync.weighIn(entry);
        return entries;
    },

    deleteWeighIn(date) {
        let entries = this.getWeighIns().filter(e => e.date !== date);
        this.set('weighins', entries);
        if (typeof SupabaseSync !== 'undefined') SupabaseSync.deleteWeighIn(date);
        return entries;
    },

    // ===== GYM LOGS =====
    getGymLogs() { return this.get('gymlogs', []); },

    saveGymLog(log) {
        const logs = this.getGymLogs();
        const idx = logs.findIndex(l => l.date === log.date && l.dayId === log.dayId);
        if (idx >= 0) logs[idx] = log;
        else logs.push(log);
        logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.set('gymlogs', logs);
        if (typeof SupabaseSync !== 'undefined') SupabaseSync.gymLog(log);

        // FIX: Always recalculate PRs from scratch for all exercises in this log.
        // This ensures that if a value was entered incorrectly and then corrected,
        // the PR reflects the actual best weight across all sessions.
        const exerciseNames = [...new Set(log.exercises.map(e => e.name))];
        exerciseNames.forEach(name => this.recalculatePRsForExercise(name));

        return logs;
    },

deleteGymLog(date, dayId) {
    const existingLogs = this.getGymLogs();
    const deletedLog = existingLogs.find(l => l.date === date && l.dayId === dayId);

    let logs = existingLogs.filter(l => !(l.date === date && l.dayId === dayId));
    this.set('gymlogs', logs);

    if (typeof SupabaseSync !== 'undefined') {
        SupabaseSync.deleteGymLog(date, dayId);
    }

    // Recalculate PRs for exercises that existed in the deleted workout
    if (deletedLog && Array.isArray(deletedLog.exercises)) {
        const exerciseNames = [...new Set(deletedLog.exercises.map(e => e.name).filter(Boolean))];
        exerciseNames.forEach(name => this.recalculatePRsForExercise(name));
    }

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
        return this.getGymLogsForDay(dayId).find(l => l.date < currentDate) || null;
    },

    // ===== PERSONAL RECORDS =====
    getPRs() { return this.get('prs', {}); },

    // FIX: PR is now based on max WEIGHT only (not volume/reps).
    // Kept for backwards-compatibility but saveGymLog now uses recalculatePRsForExercise instead.
    checkAndUpdatePR(exerciseName, weight, reps) {
        const prs    = this.getPRs();
        const current = prs[exerciseName];
        let newPR = false;

        // Compare by weight only
        if (!current || weight > current.bestWeight) {
            prs[exerciseName] = {
                bestWeight: weight,
                bestReps:   reps,
                bestVolume: weight * reps,
                date:       getLocalDateString()
            };
            newPR = true;
        }
        this.set('prs', prs);
        if (newPR && typeof SupabaseSync !== 'undefined') {
            SupabaseSync.pr(exerciseName, prs[exerciseName]);
        }
        return newPR;
    },

    // FIX: Rebuild the PR for a single exercise by scanning ALL gym logs.
    // This corrects PRs that were inflated by accidental entries.
    recalculatePRsForExercise(exerciseName) {
        const logs = this.getGymLogs();
        let bestWeight = 0;
        let bestDate   = null;
        let bestReps   = 0;

        logs.forEach(log => {
            log.exercises.forEach(ex => {
                if (ex.name !== exerciseName) return;
                const weightsArr = ex.weights
                    || (ex.weight ? Array((ex.sets || []).length || 1).fill(ex.weight) : []);
                const repsArr = ex.sets || [];

                weightsArr.forEach((w, i) => {
                    const r = repsArr[i] || 0;
                    if (w > bestWeight && r > 0) {
                        bestWeight = w;
                        bestDate   = log.date;
                        bestReps   = r;
                    }
                });
            });
        });

        const prs = this.getPRs();
        if (bestWeight > 0) {
            prs[exerciseName] = {
                bestWeight,
                bestReps,
                bestVolume: bestWeight * bestReps,
                date: bestDate
            };
        } else {
            // No valid data found — remove stale PR
            delete prs[exerciseName];
        }
        this.set('prs', prs);
        if (typeof SupabaseSync !== 'undefined' && prs[exerciseName]) {
            SupabaseSync.pr(exerciseName, prs[exerciseName]);
        }
        return prs[exerciseName] || null;
    },

    // ===== SETTINGS =====
    getSettings() {
        return this.get('settings', {
            startDate:     getLocalDateString(),
            startWeight:   CLIENT_PROFILE.startWeight,
            goalWeight:    CLIENT_PROFILE.goalWeight,
            weeklyTarget:  CLIENT_PROFILE.weeklyRateLoss,
            units:         'lbs',
            setupComplete: false
        });
    },

    saveSettings(settings) {
        this.set('settings', settings);
        if (typeof SupabaseSync !== 'undefined') SupabaseSync.settings(settings);
    },

    // ===== PROJECTED WEIGHT =====
    getProjectedWeight(weekNumber) {
        const s = this.getSettings();
        return Math.max(s.goalWeight, s.startWeight - (weekNumber * s.weeklyTarget));
    },

    getWeekNumber(date) {
        const s     = this.getSettings();
        const start = new Date(s.startDate);
        const target = new Date(date);
        const diffMs = target - start;
        return Math.max(0, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)));
    },

        // ===== EXPORT / IMPORT =====
    exportAll() {
        return JSON.stringify({
            weighins:      this.getWeighIns(),
            gymlogs:       this.getGymLogs(),
            prs:           this.getPRs(),
            settings:      this.getSettings(),
            customProgram: (() => {
                try {
                    const v = localStorage.getItem('flt_custom_program');
                    return v ? JSON.parse(v) : null;
                } catch { return null; }
            })(),
            savedPrograms: (() => {
                try {
                    const v = localStorage.getItem('flt_saved_programs');
                    return v ? JSON.parse(v) : {};
                } catch { return {}; }
            })(),
            activeProgramName: (() => {
                try {
                    return localStorage.getItem('flt_active_program_name') || null;
                } catch { return null; }
            })(),
            exportDate: new Date().toISOString()
        }, null, 2);
    },

    importAll(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            if (!data || typeof data !== 'object') {
                throw new Error('Backup must be a JSON object');
            }

            const weighins = Array.isArray(data.weighins) ? data.weighins : [];
            const gymlogs = Array.isArray(data.gymlogs) ? data.gymlogs : [];
            const prs = (data.prs && typeof data.prs === 'object' && !Array.isArray(data.prs)) ? data.prs : {};
            const settings = (data.settings && typeof data.settings === 'object' && !Array.isArray(data.settings))
                ? data.settings
                : this.getSettings();

            const currentSettings = this.getSettings();

            const safeSettings = {
                startDate: typeof settings.startDate === 'string' && settings.startDate
                    ? settings.startDate
                    : currentSettings.startDate,
                startWeight: Number.isFinite(settings.startWeight)
                    ? settings.startWeight
                    : currentSettings.startWeight,
                goalWeight: Number.isFinite(settings.goalWeight)
                    ? settings.goalWeight
                    : currentSettings.goalWeight,
                weeklyTarget: Number.isFinite(settings.weeklyTarget)
                    ? settings.weeklyTarget
                    : currentSettings.weeklyTarget,
                units: settings.units === 'lbs' ? 'lbs' : 'lbs',
                setupComplete: !!settings.setupComplete
            };

            const safeWeighins = weighins
                .filter(w =>
                    w &&
                    typeof w.date === 'string' &&
                    Number.isFinite(w.weight)
                )
                .map(w => ({
                    date: w.date,
                    weight: w.weight,
                    notes: typeof w.notes === 'string' ? w.notes : ''
                }));

            const safeGymlogs = gymlogs
                .filter(log =>
                    log &&
                    typeof log.date === 'string' &&
                    typeof log.dayId === 'string' &&
                    Array.isArray(log.exercises)
                )
                .map(log => ({
                    date: log.date,
                    dayId: log.dayId,
                    dayName: typeof log.dayName === 'string' ? log.dayName : '',
                    exercises: log.exercises.map(ex => ({
                        name: typeof ex.name === 'string' ? ex.name : 'Unknown Exercise',
                        weights: Array.isArray(ex.weights) ? ex.weights.map(w => Number(w) || 0) : [],
                        sets: Array.isArray(ex.sets) ? ex.sets.map(r => parseInt(r, 10) || 0) : [],
                        notes: typeof ex.notes === 'string' ? ex.notes : ''
                    })),
                    bodyWeight: Number.isFinite(log.bodyWeight) ? log.bodyWeight : null
                }));

            const safePRs = {};
            Object.entries(prs).forEach(([name, pr]) => {
                if (!pr || typeof pr !== 'object') return;
                if (!Number.isFinite(pr.bestWeight)) return;

                safePRs[name] = {
                    bestWeight: pr.bestWeight,
                    bestReps: Number.isFinite(pr.bestReps) ? pr.bestReps : 0,
                    bestVolume: Number.isFinite(pr.bestVolume)
                        ? pr.bestVolume
                        : (pr.bestWeight * (pr.bestReps || 0)),
                    date: typeof pr.date === 'string' ? pr.date : getLocalDateString()
                };
            });

            this.set('weighins', safeWeighins);
            this.set('gymlogs', safeGymlogs);
            this.set('prs', safePRs);
            this.set('settings', safeSettings);

            if (data.customProgram && typeof data.customProgram === 'object' && Array.isArray(data.customProgram.days)) {
                localStorage.setItem('flt_custom_program', JSON.stringify(data.customProgram));
            }

            // Restore saved programs library
            if (data.savedPrograms && typeof data.savedPrograms === 'object' && !Array.isArray(data.savedPrograms)) {
                localStorage.setItem('flt_saved_programs', JSON.stringify(data.savedPrograms));
            }

            // Restore active program name
            if (typeof data.activeProgramName === 'string' && data.activeProgramName) {
                localStorage.setItem('flt_active_program_name', data.activeProgramName);
            } else {
                localStorage.removeItem('flt_active_program_name');
            }

            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    },

    clearAll() {
        Object.keys(localStorage)
            .filter(k => k.startsWith(this.PREFIX))
            .forEach(k => localStorage.removeItem(k));
        localStorage.removeItem('flt_custom_program');
        localStorage.removeItem('flt_saved_programs');
        localStorage.removeItem('flt_active_program_name');
    }
};
