// ========== STATS ANALYTICS ==========
function renderStatsAnalytics(container, weighIns, gymLogs, settings) {
    const totalWeighIns = weighIns.length;
    const totalWorkouts = gymLogs.length;
    const prs = Storage.getPRs();

    let bestWeek = '—', worstWeek = '—', maxStreak = 0, lossWeeks = 0;

    if (weighIns.length >= 2) {
        let best = 0, worst = 0, streak = 0;
        for (let i = 1; i < weighIns.length; i++) {
            const diff = weighIns[i].weight - weighIns[i-1].weight;
            if (diff < best) { 
                best = diff; 
                bestWeek = `${best.toFixed(1)} lbs (${formatDateShort(weighIns[i].date)})`; 
            }
            if (diff > worst) { 
                worst = diff; 
                worstWeek = `+${worst.toFixed(1)} lbs (${formatDateShort(weighIns[i].date)})`; 
            }
            if (diff <= 0) { 
                streak++; 
                lossWeeks++; 
                maxStreak = Math.max(maxStreak, streak); 
            } else streak = 0;
        }
    }

    const consistency = totalWeighIns > 0 ? 
        Math.round((lossWeeks / Math.max(1, totalWeighIns - 1)) * 100) : 0;

    // Rolling 30-day Avg Workouts/Week
    let workoutsPerWeek = '—';
    if (gymLogs.length > 0) {
        const now = new Date();
        now.setHours(23, 59, 59, 999);
        
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const recentLogs = gymLogs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= thirtyDaysAgo && logDate <= now;
        });

        const recentCount = recentLogs.length;

        if (recentCount > 0) {
            const dates = recentLogs.map(l => new Date(l.date));
            const firstDate = new Date(Math.min(...dates));
            const spanDays = (now - firstDate) / (24 * 60 * 60 * 1000) + 1;
            const spanWeeks = Math.max(spanDays / 7, 0.5);
            workoutsPerWeek = (recentCount / spanWeeks).toFixed(1);
        }
    }

    // Exercise progress summary
    let totalExercisesTracked = 0;
    let exercisesImproving = 0;
    try {
        const program = getTrainingProgram();
        program.days.forEach(day => {
            const dayLogs = gymLogs
                .filter(l => l.dayId === day.id)
                .sort((a, b) => new Date(a.date) - new Date(b.date));
            
            if (dayLogs.length >= 2) {
                const hist = buildExerciseHistory ? buildExerciseHistory(dayLogs, day) : {};
                Object.values(hist).forEach(entries => {
                    if (entries.length >= 2) {
                        totalExercisesTracked++;
                        const trend = getExerciseTrend ? getExerciseTrend(entries) : { direction: 'neutral' };
                        if (trend.direction === 'up') exercisesImproving++;
                    }
                });
            }
        });
    } catch (e) {
        console.log("Exercise summary skipped", e);
    }

    container.innerHTML = `
        <div class="section-title">📊 Summary Statistics</div>
        <div class="stat-grid">
            <div class="stat-box accent">
                <div class="stat-value">${totalWeighIns}</div>
                <div class="stat-label">Weigh-Ins</div>
            </div>
            <div class="stat-box green">
                <div class="stat-value">${totalWorkouts}</div>
                <div class="stat-label">Workouts</div>
            </div>
            <div class="stat-box orange">
                <div class="stat-value">${consistency}%</div>
                <div class="stat-label">Consistency Rate</div>
            </div>
            <div class="stat-box blue">
                <div class="stat-value">${maxStreak}</div>
                <div class="stat-label">Best Streak</div>
            </div>
        </div>

        <div class="card">
            <div class="list-item">
                <div class="list-item-title">🏆 Best Week</div>
                <div class="text-green" style="font-size:13px">${bestWeek}</div>
            </div>
            <div class="list-item">
                <div class="list-item-title">😤 Worst Week</div>
                <div class="text-red" style="font-size:13px">${worstWeek}</div>
            </div>
            <div class="list-item">
                <div class="list-item-title">🏋️ Avg Workouts/Week (30d)</div>
                <div style="font-size:13px">${workoutsPerWeek}</div>
            </div>
            <div class="list-item">
                <div class="list-item-title">📊 PRs Set</div>
                <div style="font-size:13px">${Object.keys(prs).length}</div>
            </div>
            <div class="list-item">
                <div class="list-item-title">💪 Exercises Improving</div>
                <div style="font-size:13px" class="text-green">${exercisesImproving}/${totalExercisesTracked || 0}</div>
            </div>
        </div>
    `;
}
