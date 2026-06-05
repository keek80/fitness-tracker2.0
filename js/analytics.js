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

// ========== WEIGHT TREND ==========
function renderWeightAnalytics(container, weighIns, settings) {
    if (weighIns.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>No weigh-ins logged yet.</p></div>`;
        return;
    }

    const labels = weighIns.map(w => formatDateShort(w.date));
    const weights = weighIns.map(w => w.weight);

    container.innerHTML = `
        <div class="section-title">📉 Weight Trend</div>
        <canvas id="weightChart" style="max-height:340px;"></canvas>
        <div class="card" style="margin-top:16px">
            <div class="list-item"><div>Current Weight</div><div><strong>${weights[weights.length-1]} lbs</strong></div></div>
            <div class="list-item"><div>Total Loss</div><div class="text-green"><strong>${(settings.startWeight - weights[weights.length-1]).toFixed(1)} lbs</strong></div></div>
        </div>
    `;

    setTimeout(() => {
        new Chart(document.getElementById('weightChart'), {
            type: 'line',
            data: { 
                labels: labels, 
                datasets: [{ 
                    label: 'Body Weight (lbs)', 
                    data: weights, 
                    borderColor: '#00d4ff', 
                    tension: 0.3, 
                    borderWidth: 3 
                }] 
            },
            options: chartOptions(Math.min(...weights)-10, Math.max(...weights)+5)
        });
    }, 100);
}

// ========== WEEKLY PROGRESS ==========
function renderWeeklyProgress(container, weighIns, gymLogs) {
    container.innerHTML = `
        <div class="section-title">📅 Weekly Progress</div>
        <canvas id="weeklyWorkoutChart" style="max-height:260px; margin-bottom:20px;"></canvas>
        <canvas id="weeklyWeightChart" style="max-height:260px;"></canvas>
    `;

    setTimeout(() => {
        renderWeeklyWorkoutChart(gymLogs);
        renderWeeklyWeightChart(weighIns);
    }, 100);
}

function renderWeeklyWorkoutChart(gymLogs) {
    if (gymLogs.length === 0) {
        document.getElementById('weeklyWorkoutChart').outerHTML = `<p style="text-align:center; padding:40px; color:var(--text-muted);">No workouts yet.</p>`;
        return;
    }
    const data = getWeeklyWorkoutData(gymLogs);
    new Chart(document.getElementById('weeklyWorkoutChart'), {
        type: 'bar',
        data: { 
            labels: data.labels, 
            datasets: [{ 
                label: 'Workouts per Week', 
                data: data.counts, 
                backgroundColor: '#00d4ff', 
                borderRadius: 6 
            }] 
        },
        options: { 
            responsive: true, 
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });
}

function renderWeeklyWeightChart(weighIns) {
    if (weighIns.length < 2) {
        document.getElementById('weeklyWeightChart').outerHTML = `<p style="text-align:center; padding:40px; color:var(--text-muted);">Need more weigh-ins for weekly trend.</p>`;
        return;
    }
    const data = getWeeklyWeightChange(weighIns);
    new Chart(document.getElementById('weeklyWeightChart'), {
        type: 'line',
        data: { 
            labels: data.labels, 
            datasets: [{ 
                label: 'Weekly Weight Change (lbs)', 
                data: data.changes, 
                borderColor: '#22c55e', 
                tension: 0.3,
                borderWidth: 3 
            }] 
        },
        options: chartOptions(-6, 6)
    });
}

// ========== OTHER TABS (unchanged) ==========
function renderExerciseProgressAnalytics(container, gymLogs) { /* ... your existing code ... */ }
function renderPRAnalytics(container, prs) { /* ... your existing code ... */ }
function renderStatsAnalytics(container, weighIns, gymLogs, settings) { /* ... your existing code ... */ }

function chartOptions(sugMin, sugMax) {
    return {
        responsive: true, 
        maintainAspectRatio: true, 
        aspectRatio: 1.8,
        plugins: { legend: { position: 'top', labels: { color: '#a0aec0', font: { size: 11 } } } },
        scales: {
            x: { ticks: { color: '#718096' }, grid: { color: 'rgba(45,55,72,0.5)' } },
            y: { ticks: { color: '#718096' }, grid: { color: 'rgba(45,55,72,0.5)' }, suggestedMin: sugMin, suggestedMax: sugMax }
        }
    };
}

// Helper functions for Weekly tab
function getWeeklyWorkoutData(gymLogs) {
    const weeks = {};
    gymLogs.forEach(log => {
        const date = new Date(log.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Sunday start
        const key = weekStart.toISOString().split('T')[0];
        weeks[key] = (weeks[key] || 0) + 1;
    });

    const sorted = Object.keys(weeks).sort();
    return {
        labels: sorted.map(k => formatDateShort(k)),
        counts: sorted.map(k => weeks[k])
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
        const prevAvg = weekly[sortedKeys[i-1]].reduce((a, b) => a + b, 0) / weekly[sortedKeys[i-1]].length;
        const currAvg = weekly[sortedKeys[i]].reduce((a, b) => a + b, 0) / weekly[sortedKeys[i]].length;
        changes.push((currAvg - prevAvg).toFixed(1));
    }

    return {
        labels: sortedKeys.slice(1).map(k => formatDateShort(k)),
        changes: changes.map(Number)
    };
}
