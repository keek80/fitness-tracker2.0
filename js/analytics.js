// ========== ANALYTICS PAGE ==========
let analyticsTab = 'weight';

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
            <button class="tab-btn ${analyticsTab === 'weekly' ? 'active' : ''}" onclick="analyticsTab='weekly'; renderAnalytics()">Weekly</button>
            <button class="tab-btn ${analyticsTab === 'gym' ? 'active' : ''}" onclick="analyticsTab='gym'; renderAnalytics()">Exercises</button>
            <button class="tab-btn ${analyticsTab === 'prs' ? 'active' : ''}" onclick="analyticsTab='prs'; renderAnalytics()">PRs</button>
            <button class="tab-btn ${analyticsTab === 'stats' ? 'active' : ''}" onclick="analyticsTab='stats'; renderAnalytics()">Stats</button>
        </div>

        <div id="analyticsContent"></div>
    `;

    const content = document.getElementById('analyticsContent');
    
    switch (analyticsTab) {
        case 'weight': renderWeightAnalytics(content, weighIns, settings); break;
        case 'weekly': renderWeeklyProgress(content, weighIns, gymLogs); break;
        case 'gym': renderExerciseProgressAnalytics(content, gymLogs); break;
        case 'prs': renderPRAnalytics(content, prs); break;
        case 'stats': renderStatsAnalytics(content, weighIns, gymLogs, settings); break;
    }
}

// ========== WEEKLY PROGRESS CHARTS ==========
function renderWeeklyProgress(container, weighIns, gymLogs) {
    container.innerHTML = `
        <div class="section-title">📅 Weekly Progress</div>
        <canvas id="weeklyWorkoutChart" style="max-height:280px; margin-bottom:20px;"></canvas>
        <canvas id="weeklyWeightChart" style="max-height:280px;"></canvas>
    `;

    setTimeout(() => {
        renderWeeklyWorkoutChart(gymLogs);
        renderWeeklyWeightChart(weighIns);
    }, 150);
}

function renderWeeklyWorkoutChart(gymLogs) {
    if (gymLogs.length === 0) return;

    const weekData = getWeeklyWorkoutData(gymLogs);
    
    new Chart(document.getElementById('weeklyWorkoutChart'), {
        type: 'bar',
        data: {
            labels: weekData.labels,
            datasets: [{
                label: 'Workouts per Week',
                data: weekData.counts,
                backgroundColor: '#00d4ff',
                borderColor: '#00d4ff',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, color: '#718096' } },
                x: { ticks: { color: '#718096' } }
            }
        }
    });
}

function renderWeeklyWeightChart(weighIns) {
    if (weighIns.length < 2) return;

    const weeklyWeightData = getWeeklyWeightChange(weighIns);

    new Chart(document.getElementById('weeklyWeightChart'), {
        type: 'line',
        data: {
            labels: weeklyWeightData.labels,
            datasets: [{
                label: 'Weekly Weight Change (lbs)',
                data: weeklyWeightData.changes,
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.3,
                borderWidth: 3
            }]
        },
        options: chartOptions(-5, 5)
    });
}

// Helper Functions
function getWeeklyWorkoutData(gymLogs) {
    const weeks = {};
    gymLogs.forEach(log => {
        const date = new Date(log.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
        const key = weekStart.toISOString().split('T')[0];
        
        if (!weeks[key]) weeks[key] = 0;
        weeks[key]++;
    });

    const sortedKeys = Object.keys(weeks).sort();
    return {
        labels: sortedKeys.map(k => formatDateShort(k)),
        counts: sortedKeys.map(k => weeks[k])
    };
}

function getWeeklyWeightChange(weighIns) {
    const weekly = {};
    weighIns.forEach(w => {
        const date = new Date(w.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const key = weekStart.toISOString().split('T')[0];
        
        if (!weekly[key]) weekly[key] = [];
        weekly[key].push(w.weight);
    });

    const sortedKeys = Object.keys(weekly).sort();
    const changes = [];

    for (let i = 1; i < sortedKeys.length; i++) {
        const prevAvg = weekly[sortedKeys[i-1]].reduce((a,b)=>a+b,0) / weekly[sortedKeys[i-1]].length;
        const currAvg = weekly[sortedKeys[i]].reduce((a,b)=>a+b,0) / weekly[sortedKeys[i]].length;
        changes.push((currAvg - prevAvg).toFixed(1));
    }

    return {
        labels: sortedKeys.slice(1).map(k => formatDateShort(k)),
        changes: changes
    };
}

// Keep your existing functions (renderWeightAnalytics, renderExerciseProgressAnalytics, etc.)
// ... (they remain unchanged)
