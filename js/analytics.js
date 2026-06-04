// ========== ANALYTICS PAGE ==========
let analyticsTab = 'weight';
let selectedAnalyticsDay = null;
let selectedExercise = null;

function renderAnalytics() {
    const page = document.getElementById('page-analytics');
    const weighIns = Storage.getWeighIns();
    const gymLogs = Storage.getGymLogs();
    const settings = Storage.getSettings();
    const prs = Storage.getPRs();

    page.innerHTML = `
        <div class="section-title">📈 Analytics</div>
        
        <div class="tab-bar">
            <button class="tab-btn ${analyticsTab === 'weight' ? 'active' : ''}" onclick="analyticsTab='weight'; renderAnalytics()">Weight</button>
            <button class="tab-btn ${analyticsTab === 'gym' ? 'active' : ''}" onclick="analyticsTab='gym'; renderAnalytics()">Exercises</button>
            <button class="tab-btn ${analyticsTab === 'prs' ? 'active' : ''}" onclick="analyticsTab='prs'; renderAnalytics()">PRs</button>
            <button class="tab-btn ${analyticsTab === 'stats' ? 'active' : ''}" onclick="analyticsTab='stats'; renderAnalytics()">Stats</button>
        </div>

        <div id="analyticsContent"></div>
    `;

    const content = document.getElementById('analyticsContent');
    
    switch (analyticsTab) {
        case 'weight': renderWeightAnalytics(content, weighIns, settings); break;
        case 'gym': renderExerciseProgressAnalytics(content, gymLogs); break;
        case 'prs': renderPRAnalytics(content, prs); break;
        case 'stats': renderStatsAnalytics(content, weighIns, gymLogs, settings); break;
    }
}

// ... [All other functions remain unchanged: renderWeightAnalytics, renderExerciseProgressAnalytics, buildExerciseHistory, etc.] ...

// ========== STATS ANALYTICS ==========

// ========== STATS ANALYTICS ==========
function renderStatsAnalytics(container, weighIns, gymLogs, settings) {
    const totalWeighIns = weighIns.length;
    const totalWorkouts = gymLogs.length;
    
    let bestWeek = '—', worstWeek = '—', streak = 0, maxStreak = 0;
    let lossWeeks = 0;
    
    if (weighIns.length >= 2) {
        let best = 0, worst = 0;
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

    // === IMPROVED Rolling 30-day Avg Workouts/Week ===
    let workoutsPerWeek = '—';
    if (gymLogs.length > 0) {
        const now = new Date();
        now.setHours(23, 59, 59, 999); // End of today
        
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const recentLogs = gymLogs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= thirtyDaysAgo && logDate <= now;
        });

        const recentCount = recentLogs.length;

        if (recentCount > 0) {
            // Calculate exact weeks spanned in the last 30 days
            const firstRecent = new Date(Math.min(...recentLogs.map(l => new Date(l.date))));
            const spanDays = (now - firstRecent) / (24 * 60 * 60 * 1000);
            const spanWeeks = Math.max(spanDays / 7, 1);
            
            workoutsPerWeek = (recentCount / spanWeeks).toFixed(1);
        }
    }

    // Exercise progress summary (unchanged)
    const program = getTrainingProgram();
    let totalExercisesTracked = 0;
    let exercisesImproving = 0;
    
    program.days.forEach(day => {
        const dayLogs = gymLogs
            .filter(l => l.dayId === day.id)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        if (dayLogs.length >= 2) {
            const hist = buildExerciseHistory(dayLogs, day);
            Object.values(hist).forEach(entries => {
                if (entries.length >= 2) {
                    totalExercisesTracked++;
                    const trend = getExerciseTrend(entries);
                    if (trend.direction === 'up') exercisesImproving++;
                }
            });
        }
    });

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
                <div class="stat-label">Win Rate</div>
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
                <div style="font-size:13px">${Object.keys(Storage.getPRs()).length}</div>
            </div>
            <div class="list-item">
                <div class="list-item-title">💪 Exercises Improving</div>
                <div style="font-size:13px" class="text-green">${exercisesImproving}/${totalExercisesTracked}</div>
            </div>
        </div>
    `;
}

// ... rest of the file (chartOptions function) ...
function chartOptions(sugMin, sugMax) {
    return {
        responsive: true, maintainAspectRatio: true, aspectRatio: 1.6,
        plugins: { legend: { position: 'top', labels: { color: '#a0aec0', font: { size: 11 }, boxWidth: 12 } } },
        scales: {
            x: { ticks: { color: '#718096', font: { size: 10 }, maxRotation: 45 }, grid: { color: 'rgba(45,55,72,0.5)' } },
            y: { ticks: { color: '#718096', font: { size: 10 } }, grid: { color: 'rgba(45,55,72,0.5)' }, suggestedMin: sugMin, suggestedMax: sugMax }
        }
    };
}
