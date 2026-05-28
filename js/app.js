// ========== MAIN APP CONTROLLER ==========

// Navigation
function navigate(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target page
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    // Update bottom nav
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-page') === page);
    });

    // Update drawer
    document.querySelectorAll('.drawer-content a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-page') === page);
    });

    // Update header title
    const titles = {
        dashboard: '📊 Dashboard',
        weighin: '⚖️ Weigh-In',
        gym: '💪 Gym Log',
        analytics: '📈 Analytics',
        meals: '🍽️ Meal Plan',
        program: '🏋️ Training Program',
        exercises: '🛠️ Exercise Manager',
        settings: '⚙️ Settings'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';

    // Render page
    switch (page) {
        case 'dashboard': renderDashboard(); break;
        case 'weighin': renderWeighIn(); break;
        case 'gym': renderGym(); break;
        case 'analytics': renderAnalytics(); break;
        case 'meals': renderMeals(); break;
        case 'program': renderProgram(); break;
        case 'exercises': renderExercises(); break;
        case 'settings': renderSettings(); break;
    }

    // Close drawer if open
    closeDrawer();

    // Scroll to top
    document.querySelector('.pages').scrollTop = 0;
}

// Drawer
function openDrawer() {
    document.getElementById('drawer').classList.remove('hidden');
}
function closeDrawer() {
    document.getElementById('drawer').classList.add('hidden');
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast';
    toast.style.background = type === 'error' ? '#e94560' : '#00d68f';
    toast.style.color = type === 'error' ? '#fff' : '#000';
    setTimeout(() => { toast.classList.add('hidden'); }, 2500);
}

// Menu button
document.getElementById('menuBtn').addEventListener('click', openDrawer);

// ========== INITIALIZATION ==========
function initApp() {
    // Render dashboard
    renderDashboard();

    // Hide splash
    const splash = document.getElementById('splash');
    setTimeout(() => {
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
        }, 400);
    }, 1200);
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('SW registered'))
        .catch(err => console.log('SW registration failed:', err));
}

// Start app
document.addEventListener('DOMContentLoaded', initApp);

// Handle back button / browser navigation
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) navigate(e.state.page);
});
