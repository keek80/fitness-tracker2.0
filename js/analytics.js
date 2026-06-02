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

function renderWeightAnalytics(container, weighIns, settings) {
    if (weighIns.length < 2) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">📉</div><p>Log at least 2 weigh-ins to see trends.</p></div>';
        return;
    }

    // Calculate rolling average (4-week)
    const labels = weighIns.map(e => formatDateShort(e.date));
    const actual = weighIns.map(e => e.weight);
    const projected = weighIns.map(e => Storage.getProjectedWeight(Storage.getWeekNumber(e.date)));
    
    const rolling = actual.map((w, i) => {
        if (i < 3) return null;
        return (actual[i] + actual[i-1] + actual[i-2] + actual[i-3]) / 4;
    });

    // Weekly changes
    const changes = weighIns.map((e, i) => {
        if (i === 0) return 0;
        return e.weight - weighIns[i-1].weight;
    });

    container.innerHTML = `
        <div class="chart-container">
            <div style="font-size:13px; font-weight:600; margin-bottom:8px">Weight Trend vs. Projected</div>
            <canvas id="weightTrendChart"></canvas>
        </div>
        
        <div class="chart-container">
            <div style="font-size:13px; font-weight:600; margin-bottom:8px">Weekly Changes</div>
            <canvas id="weeklyChangeChart"></canvas>
        </div>

        <div class="section-title">📊 Weight Breakdown</div>
        <div class="card">
            ${weighIns.slice().reverse().slice(0, 12).map((e, i, arr) => {
                const prev = i < arr.length - 1 ? arr[i + 1] : null;
                const change = prev ? e.weight - prev.weight : 0;
                const wk = Storage.getWeekNumber(e.date);
                const proj = Storage.getProjectedWeight(wk);
                const vs = e.weight - proj;
                return `<div class="list-item">
                    <div class="list-item-left">
                        <div class="list-item-title">Week ${wk} — ${formatDateShort(e.date)}</div>
                        <div class="list-item-sub">Projected: ${proj.toFixed(1)} · Diff: <span class="${vs <= 0 ? 'text-green' : 'text-red'}">${vs > 0 ? '+' : ''}${vs.toFixed(1)}</span></div>
                    </div>
                    <div class="list-item-right">
                        <div class="list-item-value" style="font-size:15px">${e.weight}</div>
                        <div style="font-size:12px" class="${change <= 0 ? 'text-green' : 'text-red'}">${change !== 0 ? (change > 0 ? '+' : '') + change.toFixed(1) : '—'}</div>
                    </div>
                </div>`;
            }).join('')}
        </div>
    `;

    // Weight Trend Chart
    new Chart(document.getElementById('weightTrendChart'), {
        type: 'line',
        data: {
            labels,
            datasets: [
                { label: 'Actual', data: actual, borderColor: '#e94560', borderWidth: 2.5, pointRadius: 3, fill: false, tension: 0.3 },
                { label: 'Projected', data: projected, borderColor: '#0095ff', borderWidth: 2, borderDash: [6,4], pointRadius: 0, fill: false, tension: 0.3 },
                { label: '4-Week Avg', data: rolling, borderColor: '#ffaa00', borderWidth: 2, borderDash: [3,3], pointRadius: 0, fill: false, tension: 0.4 }
            ]
        },
        options: chartOptions(settings.goalWeight - 10, settings.startWeight + 5)
    });

    // Weekly Change Chart
    new Chart(document.getElementById('weeklyChangeChart'), {
        type: 'bar',
        data: {
            labels: labels.slice(1),
            datasets: [{
                label: 'Weekly Change',
                data: changes.slice(1),
                backgroundColor: changes.slice(1).map(c => c <= 0 ? 'rgba(0,214,143,0.7)' : 'rgba(233,69,96,0.7)'),
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true, aspectRatio: 1.8,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#718096', font: { size: 10 }, maxRotation: 45 }, grid: { display: false } },
                y: { ticks: { color: '#718096', font: { size: 10 } }, grid: { color: 'rgba(45,55,72,0.5)' } }
            }
        }
    });
}

// ========== NEW: EXERCISE-BY-EXERCISE PROGRESSION ==========

function renderExerciseProgressAnalytics(container, gymLogs) {
    if (gymLogs.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">💪</div><p>Log workouts to see exercise progression.</p></div>';
        return;
    }

    const program = getTrainingProgram();

    // Auto-select first day if none selected
    if (!selectedAnalyticsDay || !program.days.find(d => d.id === selectedAnalyticsDay)) {
        selectedAnalyticsDay = program.days.length > 0 ? program.days[0].id : null;
    }

    if (!selectedAnalyticsDay) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">🏋️</div><p>No training days configured.</p></div>';
        return;
    }

    const currentDay = program.days.find(d => d.id === selectedAnalyticsDay);
    
    // Get all logs for the selected day, sorted oldest → newest for charts
    const dayLogs = gymLogs
        .filter(l => l.dayId === selectedAnalyticsDay)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Build exercise history from logs
    const exerciseHistory = buildExerciseHistory(dayLogs, currentDay);
    const exerciseNames = Object.keys(exerciseHistory);

    // Auto-select first exercise if none selected or selection doesn't exist in this day
    if (!selectedExercise || !exerciseNames.includes(selectedExercise)) {
        selectedExercise = exerciseNames.length > 0 ? exerciseNames[0] : null;
    }

    // Build the UI
    container.innerHTML = `
        <!-- Training Day Selector -->
        <div class="day-selector" style="margin-bottom:12px">
            ${program.days.map(d => `
                <button class="day-btn ${d.id === selectedAnalyticsDay ? 'active' : ''}" 
                        style="${d.id === selectedAnalyticsDay ? 'background:' + d.color + '; border-color:' + d.color + '; color:' + (isLightColor(d.color) ? '#000' : '#fff') : ''}"
                        onclick="selectAnalyticsDay('${d.id}')">
                    ${d.name}
                </button>
            `).join('')}
        </div>

        <!-- Session count -->
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:14px; text-align:center">
            ${dayLogs.length} session${dayLogs.length !== 1 ? 's' : ''} logged for ${currentDay.name}
        </div>

        ${dayLogs.length === 0 ? `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <p>No sessions logged for ${currentDay.name} yet.<br>Hit the gym and come back!</p>
            </div>
        ` : `
            <!-- Exercise Selector -->
            <div class="exercise-selector">
                ${exerciseNames.map(name => {
                    const hist = exerciseHistory[name];
                    const trend = getExerciseTrend(hist);
                    return `
                    <button class="exercise-select-btn ${name === selectedExercise ? 'active' : ''}" 
                            onclick="selectAnalyticsExercise('${name.replace(/'/g, "\\'")}')">
                        <span class="exercise-select-name">${name}</span>
                        <span class="exercise-select-trend ${trend.direction}">${trend.icon} ${trend.text}</span>
                    </button>`;
                }).join('')}
            </div>

            <!-- Selected Exercise Detail -->
            ${selectedExercise && exerciseHistory[selectedExercise] ? renderExerciseDetail(selectedExercise, exerciseHistory[selectedExercise], currentDay.color) : ''}
        `}
    `;

    // Render the chart if we have data
    if (selectedExercise && exerciseHistory[selectedExercise] && exerciseHistory[selectedExercise].length >= 2) {
        renderExerciseChart(exerciseHistory[selectedExercise], currentDay.color);
    }
}

/**
 * Build a history object for each exercise from gym logs.
 * Returns: { "Exercise Name": [ { date, weight, sets, reps, totalReps, volume }, ... ] }
 */
function buildExerciseHistory(dayLogs, day) {
    const history = {};
    
    // Initialize with current program exercises to preserve order
    if (day && day.exercises) {
        day.exercises.forEach(ex => { history[ex.name] = []; });
    }

    dayLogs.forEach(log => {
        log.exercises.forEach(ex => {
            // Handle both old format (single weight) and new format (per-set weights array)
            const repsArr = ex.sets || [];
            const weightsArr = ex.weights
                ? ex.weights
                : Array(repsArr.length).fill(ex.weight || 0);

            const hasData = weightsArr.some(w => w > 0) || repsArr.some(s => s > 0);
            if (!hasData) return;

            if (!history[ex.name]) history[ex.name] = [];

            const totalReps = repsArr.reduce((a, b) => a + b, 0);
            // Max weight used across all sets — used for trend/chart
            const maxWeight = weightsArr.length > 0 ? Math.max(...weightsArr.filter(w => w > 0), 0) : 0;
            // Total volume = sum of (weight × reps) for each set
            const volume = weightsArr.reduce((sum, w, i) => sum + (w || 0) * (repsArr[i] || 0), 0);

            history[ex.name].push({
                date: log.date,
                weight: maxWeight,       // max weight this session (for chart)
                weights: weightsArr,     // per-set weights
                sets: repsArr,           // per-set reps
                totalReps,
                volume,
                notes: ex.notes || ''
            });
        });
    });

    // Remove exercises with no data
    Object.keys(history).forEach(key => {
        if (history[key].length === 0) delete history[key];
    });

    return history;
}

/**
 * Determine the trend for an exercise (up, down, flat)
 */
function getExerciseTrend(entries) {
    if (!entries || entries.length < 2) {
        return { direction: 'neutral', icon: '➖', text: 'New' };
    }

    const latest = entries[entries.length - 1];
    const previous = entries[entries.length - 2];
    
    // Compare by weight first, then by total reps
    if (latest.weight > previous.weight) {
        return { direction: 'up', icon: '📈', text: `+${(latest.weight - previous.weight).toFixed(0)} lbs` };
    } else if (latest.weight < previous.weight) {
        return { direction: 'down', icon: '📉', text: `${(latest.weight - previous.weight).toFixed(0)} lbs` };
    } else if (latest.totalReps > previous.totalReps) {
        return { direction: 'up', icon: '📈', text: `+${latest.totalReps - previous.totalReps} reps` };
    } else if (latest.totalReps < previous.totalReps) {
        return { direction: 'down', icon: '📉', text: `${latest.totalReps - previous.totalReps} reps` };
    }
    return { direction: 'neutral', icon: '➡️', text: 'Same' };
}

/**
 * Render detailed view for the selected exercise
 */
function renderExerciseDetail(name, entries, dayColor) {
    if (!entries || entries.length === 0) return '';

    const latest = entries[entries.length - 1];
    const first = entries[0];
    const prs = Storage.getPRs();
    const pr = prs[name];

    // Calculate progression stats
    const weightChange = latest.weight - first.weight;
    const weightChangePct = first.weight > 0 ? ((weightChange / first.weight) * 100).toFixed(0) : 0;
    const volumeChange = latest.volume - first.volume;
    const volumeChangePct = first.volume > 0 ? ((volumeChange / first.volume) * 100).toFixed(0) : 0;

    // Find best session by volume
    const bestSession = entries.reduce((best, e) => e.volume > best.volume ? e : best, entries[0]);

    // Estimated 1RM (Epley formula: weight * (1 + reps/30))
    const maxSingleSetReps = Math.max(...latest.sets.filter(s => s > 0), 0);
    const est1RM = latest.weight > 0 && maxSingleSetReps > 0 
        ? (latest.weight * (1 + maxSingleSetReps / 30)).toFixed(0) 
        : '—';

    return `
        <!-- Exercise Header -->
        <div class="card" style="border-left: 3px solid ${dayColor}; margin-top: 14px">
            <div style="font-size:16px; font-weight:700; margin-bottom:4px">${name}</div>
            <div style="font-size:12px; color:var(--text-muted)">${entries.length} session${entries.length !== 1 ? 's' : ''} tracked</div>
            ${pr ? `
                <!-- FIX: PR badge shows weight only -->
                <div class="pr-badge" style="margin-top:6px; display:inline-block">🏆 PR: ${pr.bestWeight} lbs</div>
            ` : ''}
        </div>

        <!-- Key Stats -->
        <div class="stat-grid">
            <div class="stat-box blue">
                <div class="stat-value" style="font-size:20px">${latest.weight}<span style="font-size:12px"> lbs</span></div>
                <div class="stat-label">Current Weight</div>
            </div>
            <div class="stat-box ${Number(weightChangePct) >= 0 ? 'green' : 'accent'}">
                <div class="stat-value" style="font-size:20px">${weightChange > 0 ? '+' : ''}${weightChange}<span style="font-size:12px"> lbs</span></div>
                <div class="stat-label">Weight Progress</div>
            </div>
            <div class="stat-box orange">
                <div class="stat-value" style="font-size:20px">${est1RM}<span style="font-size:12px"> lbs</span></div>
                <div class="stat-label">Est. 1RM</div>
            </div>
            <div class="stat-box purple">
                <div class="stat-value" style="font-size:20px">${volumeChangePct > 0 ? '+' : ''}${volumeChangePct}<span style="font-size:12px">%</span></div>
                <div class="stat-label">Volume Change</div>
            </div>
        </div>

        <!-- Weight Progression Chart -->
        ${entries.length >= 2 ? `
        <div class="chart-container">
            <div style="font-size:13px; font-weight:600; margin-bottom:8px">Weight Over Time</div>
            <canvas id="exerciseProgressChart"></canvas>
        </div>
        ` : `
        <div class="card" style="text-align:center; padding:20px; color:var(--text-muted); font-size:13px">
            📊 Log at least 2 sessions to see the progression chart
        </div>
        `}

        <!-- Session History -->
        <div class="section-title">📋 Session History</div>
        <div class="exercise-history-list">
            ${entries.slice().reverse().map((entry, i, arr) => {
                const prev = i < arr.length - 1 ? arr[i + 1] : null;
                const weightDiff = prev ? entry.weight - prev.weight : 0;
                const repsDiff = prev ? entry.totalReps - prev.totalReps : 0;
                const isBestSession = entry === bestSession;
                
                return `
                <div class="card exercise-history-item ${isBestSession ? 'best-session' : ''}" style="padding:12px 14px; margin-bottom:8px">
                    <div class="flex-between mb-8">
                        <div>
                            <span style="font-size:13px; font-weight:600">${formatDateShort(entry.date)}</span>
                            ${isBestSession ? '<span class="badge badge-orange" style="margin-left:6px; font-size:9px">BEST</span>' : ''}
                        </div>
                        <div style="text-align:right">
                            <span style="font-size:15px; font-weight:700; color:${dayColor}">${entry.weight} lbs</span>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center">
                        <div style="font-size:12px; color:var(--text-secondary)">
                            ${entry.sets.map((r, si) => {
                                const w = (entry.weights || [])[si] || entry.weight || 0;
                                return r > 0 ? `<span style="color:var(--text-primary)">${w > 0 ? w + '×' : ''}${r}</span>` : null;
                            }).filter(Boolean).join(' <span style="color:var(--border)">·</span> ')}
                            <span style="color:var(--text-muted)"> · ${entry.totalReps} reps · ${entry.volume.toLocaleString()} vol</span>
                        </div>
                        <div style="font-size:11px; white-space:nowrap; margin-left:8px">
                            ${weightDiff !== 0 ? `<span class="${weightDiff > 0 ? 'text-green' : 'text-red'}">${weightDiff > 0 ? '↑' : '↓'}${Math.abs(weightDiff)}lb</span>` : ''}
                            ${repsDiff !== 0 ? `<span class="${repsDiff > 0 ? 'text-green' : 'text-red'}" style="margin-left:4px">${repsDiff > 0 ? '↑' : '↓'}${Math.abs(repsDiff)}rep</span>` : ''}
                            ${weightDiff === 0 && repsDiff === 0 && prev ? '<span class="text-muted">—</span>' : ''}
                        </div>
                    </div>
                    ${entry.notes ? `<div style="font-size:11px; color:var(--accent-orange); margin-top:4px">📝 ${entry.notes}</div>` : ''}
                </div>`;
            }).join('')}
        </div>
    `;
}

/**
 * Render the exercise progression chart (weight + volume over time)
 */
function renderExerciseChart(entries, dayColor) {
    const canvas = document.getElementById('exerciseProgressChart');
    if (!canvas) return;

    const labels = entries.map(e => formatDateShort(e.date));
    const weights = entries.map(e => e.weight);
    const volumes = entries.map(e => e.volume);
    const totalReps = entries.map(e => e.totalReps);

    new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Weight (lbs)',
                    data: weights,
                    borderColor: dayColor,
                    backgroundColor: dayColor + '33',
                    borderWidth: 2.5,
                    pointRadius: 4,
                    pointBackgroundColor: dayColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1.5,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'Total Reps',
                    data: totalReps,
                    borderColor: '#ffaa00',
                    borderWidth: 2,
                    borderDash: [4, 3],
                    pointRadius: 3,
                    pointBackgroundColor: '#ffaa00',
                    fill: false,
                    tension: 0.3,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.6,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#a0aec0', font: { size: 11 }, boxWidth: 12 }
                },
                tooltip: {
                    callbacks: {
                        afterBody: function(context) {
                            const idx = context[0].dataIndex;
                            const vol = volumes[idx];
                            return `Volume: ${vol.toLocaleString()} lbs`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#718096', font: { size: 10 }, maxRotation: 45 },
                    grid: { color: 'rgba(45,55,72,0.5)' }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Weight (lbs)', color: '#718096', font: { size: 11 } },
                    ticks: { color: '#718096', font: { size: 10 } },
                    grid: { color: 'rgba(45,55,72,0.5)' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Reps', color: '#ffaa00', font: { size: 11 } },
                    ticks: { color: '#ffaa00', font: { size: 10 } },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
}

// Navigation helpers for exercise analytics
function selectAnalyticsDay(dayId) {
    selectedAnalyticsDay = dayId;
    selectedExercise = null; // Reset exercise selection when day changes
    renderAnalytics();
}

function selectAnalyticsExercise(name) {
    selectedExercise = name;
    renderAnalytics();
}

// ========== PR ANALYTICS ==========

function renderPRAnalytics(container, prs) {
    const prList = Object.entries(prs);
    if (prList.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">🏆</div><p>No personal records yet. Start lifting!</p></div>';
        return;
    }

    // FIX: Sort by best weight (heaviest first) and display weight only
    container.innerHTML = `
        <div style="text-align:center; margin-bottom:16px">
            <div style="font-size:48px">🏆</div>
            <div style="font-size:20px; font-weight:700">${prList.length} Personal Records</div>
        </div>
        ${prList.sort((a,b) => b[1].bestWeight - a[1].bestWeight).map(([name, pr]) => `
            <div class="card" style="border-left: 3px solid #ffd700">
                <div class="flex-between">
                    <div>
                        <div style="font-size:14px; font-weight:600">${name}</div>
                        <div style="font-size:12px; color:var(--text-muted)">Set on ${formatDate(pr.date)}</div>
                    </div>
                    <div style="text-align:right">
                        <!-- FIX: Weight only, no reps in PR display -->
                        <div style="font-size:22px; font-weight:700; color:#ffd700">${pr.bestWeight} lbs</div>
                        <div style="font-size:11px; color:var(--text-muted)">${pr.bestReps} reps that session</div>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
}

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
            if (diff < best) { best = diff; bestWeek = `${best.toFixed(1)} lbs (${formatDateShort(weighIns[i].date)})`; }
            if (diff > worst) { worst = diff; worstWeek = `+${worst.toFixed(1)} lbs (${formatDateShort(weighIns[i].date)})`; }
            if (diff <= 0) { streak++; lossWeeks++; maxStreak = Math.max(maxStreak, streak); }
            else streak = 0;
        }
    }

    const consistency = totalWeighIns > 0 ? 
        Math.round((lossWeeks / Math.max(1, totalWeighIns - 1)) * 100) : 0;

    // Workouts per week average
    let workoutsPerWeek = '—';
    if (gymLogs.length >= 2) {
        const dates = gymLogs.map(l => new Date(l.date));
        const spanMs = Math.max(...dates) - Math.min(...dates);
        const spanWeeks = spanMs / (7 * 24 * 60 * 60 * 1000);
        workoutsPerWeek = spanWeeks > 0 ? (gymLogs.length / spanWeeks).toFixed(1) : gymLogs.length;
    }

    // Exercise progress summary
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
                <div class="list-item-title">🏋️ Avg Workouts/Week</div>
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
