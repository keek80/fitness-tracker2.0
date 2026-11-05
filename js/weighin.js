// ========== WEIGH-IN PAGE ==========
let weighInView = 'lifetime'; // 'lifetime' | 'yearly' | 'monthly'

function renderWeighIn() {
    const page = document.getElementById('page-weighin');
    const weighIns = Storage.getWeighIns();
    const settings = Storage.getSettings();
    const today = new Date().toISOString().split('T')[0];

    page.innerHTML = `
        <div class="section-title">⚖️ Log Weigh-In</div>
        <div class="card">
            <div class="form-group">
                <label class="form-label">Date</label>
                <input type="date" id="weighInDate" class="form-input" value="${today}">
            </div>
            <div class="form-group">
                <label class="form-label">Weight (lbs)</label>
                <input type="number" id="weighInWeight" class="form-input" placeholder="Enter weight" step="0.1" inputmode="decimal">
            </div>
            <div class="form-group">
                <label class="form-label">Notes (optional)</label>
                <textarea id="weighInNotes" class="form-input" placeholder="How are you feeling? Sleep quality, stress, etc." rows="2"></textarea>
            </div>
            <button class="btn btn-primary" onclick="saveWeighIn()">💾 Save Weigh-In</button>
        </div>

        <div class="section-title">📉 Weight Trend</div>
        <div class="chart-container">
            <canvas id="weighInChart"></canvas>
        </div>

        <div class="section-title flex-between">
            <span>📋 History</span>
            <span class="text-muted" style="font-size:12px">${weighIns.length} entries</span>
        </div>

        <div class="tab-bar" style="margin-bottom:12px;">
            <button class="tab-btn ${weighInView === 'lifetime' ? 'active' : ''}" onclick="setWeighInView('lifetime')">Lifetime</button>
            <button class="tab-btn ${weighInView === 'yearly' ? 'active' : ''}" onclick="setWeighInView('yearly')">Yearly</button>
            <button class="tab-btn ${weighInView === 'monthly' ? 'active' : ''}" onclick="setWeighInView('monthly')">Monthly</button>
        </div>

        <div id="weighInHistory">
            ${renderWeighInHistory(weighIns)}
        </div>
    `;

    renderWeighInChart(weighIns, settings);
}

function setWeighInView(view) {
    weighInView = view;
    renderWeighIn();
}

function renderWeighInHistory(weighIns) {
    if (weighIns.length === 0) {
        return `
            <div class="empty-state">
                <div class="empty-icon">⚖️</div>
                <p>No weigh-ins yet. Log your first one above!</p>
            </div>`;
    }

    if (weighInView === 'lifetime') {
        return weighIns.slice().reverse().map((entry, i, arr) => {
            const prev = i < arr.length - 1 ? arr[i + 1] : null;
            const change = prev ? entry.weight - prev.weight : 0;
            const changeStr = change === 0 ? '—' : (change > 0 ? '+' : '') + change.toFixed(1);
            const changeClass = change <= 0 ? 'negative' : 'positive';
            return `
                <div class="history-item">
                    <div>
                        <div class="history-date">${formatDate(entry.date)}</div>
                        ${entry.notes ? `<div style="font-size:11px; color:var(--text-muted); margin-top:2px">${entry.notes}</div>` : ''}
                    </div>
                    <div style="display:flex; align-items:center; gap:12px">
                        <div style="text-align:right">
                            <div class="history-weight">${entry.weight}</div>
                            <div class="history-change ${changeClass}">${changeStr} lbs</div>
                        </div>
                        <button class="delete-btn" onclick="deleteWeighIn('${entry.date}')" title="Delete">🗑️</button>
                    </div>
                </div>`;
        }).join('');
    }

    // Group for yearly / monthly
    const groups = {};
    weighIns.forEach(entry => {
        const d = new Date(entry.date + 'T12:00:00');
        const key = weighInView === 'yearly'
            ? d.getFullYear().toString()
            : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(entry);
    });

    const sortedKeys = Object.keys(groups).sort().reverse();

    return sortedKeys.map(key => {
        const entries = groups[key].sort((a, b) => a.date.localeCompare(b.date));
        const start = entries[0];
        const end = entries[entries.length - 1];
        const change = end.weight - start.weight;
        const changeStr = (change > 0 ? '+' : '') + change.toFixed(1);
        const changeClass = change <= 0 ? 'negative' : 'positive';
        const label = weighInView === 'yearly'
            ? key
            : new Date(key + '-01T12:00:00').toLocaleDateString(undefined, { month: 'short', year: 'numeric' });

        return `
            <div class="history-item">
                <div>
                    <div class="history-date">${label}</div>
                    <div style="font-size:11px; color:var(--text-muted); margin-top:2px">${entries.length} weigh-in${entries.length > 1 ? 's' : ''}</div>
                </div>
                <div style="text-align:right">
                    <div class="history-weight">${end.weight}</div>
                    <div style="font-size:11px; color:var(--text-muted)">${start.weight} → ${end.weight}</div>
                    <div class="history-change ${changeClass}">${changeStr} lbs</div>
                </div>
            </div>`;
    }).join('');
}

function saveWeighIn() {
    const date = document.getElementById('weighInDate').value;
    const weight = parseFloat(document.getElementById('weighInWeight').value);
    const notes = document.getElementById('weighInNotes').value.trim();

    if (!date || !weight || weight < 100 || weight > 600) {
        showToast('Please enter a valid weight', 'error');
        return;
    }

    Storage.saveWeighIn({ date, weight, notes });
    showToast('✅ Weigh-in saved!');
    renderWeighIn();
    if (typeof renderDashboard === 'function') renderDashboard();
}

function deleteWeighIn(date) {
    if (confirm('Delete this weigh-in?')) {
        Storage.deleteWeighIn(date);
        showToast('Weigh-in deleted');
        renderWeighIn();
        if (typeof renderDashboard === 'function') renderDashboard();
    }
}

function renderWeighInChart(weighIns, settings) {
    const canvas = document.getElementById('weighInChart');
    if (!canvas || weighIns.length === 0) return;

    if (window.currentCharts) {
        window.currentCharts.forEach(c => { try { c.destroy(); } catch(e) {} });
        window.currentCharts = [];
    }

    const labels = weighIns.map(w => formatDateShort(w.date));
    const weights = weighIns.map(w => w.weight);

    const chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Weight',
                data: weights,
                borderColor: '#e94560',
                backgroundColor: 'rgba(233,69,96,0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: weighIns.length > 30 ? 0 : 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: false },
                x: { ticks: { maxTicksLimit: 8 } }
            }
        }
    });

    window.currentCharts.push(chart);
}

function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
