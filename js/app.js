// ========== MAIN APP CONTROLLER ==========

// Called after successful sign-in — pulls cloud data then shows app
async function onSignedIn() {
    // Show loading state on auth page while we fetch data
    const authPage = document.getElementById('auth-page');
    if (authPage) {
        authPage.innerHTML = `
            <div class="auth-container" style="text-align:center; padding-top:80px">
                <div class="auth-logo">🏋️</div>
                <div class="auth-title">Loading your data...</div>
                <div class="auth-subtitle">Syncing from cloud ☁️</div>
                <div class="loader" style="margin:24px auto"></div>
            </div>`;
    }

    // Pull all data from Supabase into localStorage
    await SupabaseSync.pullAll();

    // Show the main app
    showMainAppView();
    initApp();
}

// Navigation
function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-page') === page);
    });

    document.querySelectorAll('.drawer-content a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-page') === page);
    });

    const titles = {
        dashboard: '📊 Dashboard',
        weighin:   '⚖️ Weigh-In',
        gym:       '💪 Gym Log',
        analytics: '📈 Analytics',
        meals:     '🍽️ Meal Plan',
        program:   '🏋️ Training Program',
        exercises: '🛠️ Exercise Manager',
        settings:  '⚙️ Settings'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';

    switch (page) {
        case 'dashboard': renderDashboard();  break;
        case 'weighin':   renderWeighIn();    break;
        case 'gym':       renderGym();        break;
        case 'analytics': renderAnalytics();  break;
        case 'meals':     renderMeals();      break;
        case 'program':   renderProgram();    break;
        case 'exercises': renderExercises();  break;
        case 'settings':  renderSettings();   break;
    }

    closeDrawer();
    document.querySelector('.pages').scrollTop = 0;
}

// Drawer
function openDrawer()  { document.getElementById('drawer').classList.remove('hidden'); }
function closeDrawer() { document.getElementById('drawer').classList.add('hidden');    }

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
    renderDashboard();

    // Update drawer to show signed-in user email
    const email = SupabaseAuth.getUserEmail();
    const drawerSubtitle = document.querySelector('.drawer-subtitle');
    if (drawerSubtitle && email) {
        drawerSubtitle.textContent = email;
    }

    const splash = document.getElementById('splash');
    if (splash && !splash.classList.contains('done')) {
        splash.classList.add('done');
        setTimeout(() => {
            splash.classList.add('fade-out');
            setTimeout(() => { splash.style.display = 'none'; }, 400);
        }, 800);
    }
}

// ========== STARTUP — Check Auth ==========
async function startup() {
    // Always hide splash after 5s max (failsafe)
    const splashTimeout = setTimeout(() => {
        const splash = document.getElementById('splash');
        if (splash) splash.style.display = 'none';
    }, 5000);

    try {
        const session = await SupabaseAuth.getSession();

        if (session) {
            // Already signed in — pull data and show app
            clearTimeout(splashTimeout);
            await onSignedIn();
        } else {
            // Not signed in — show auth screen
            clearTimeout(splashTimeout);
            const splash = document.getElementById('splash');
            if (splash) splash.style.display = 'none';
            showAuthPageView();
        }
    } catch (e) {
        console.warn('Startup error:', e);
        clearTimeout(splashTimeout);
        const splash = document.getElementById('splash');
        if (splash) splash.style.display = 'none';
        showAuthPageView();
    }
}

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('SW registered'))
        .catch(err => console.log('SW failed:', err));
}

// Listen for auth state changes (e.g. token refresh, session expiry)
window._supabase?.auth?.onAuthStateChange?.((event, session) => {
    if (event === 'SIGNED_OUT') {
        Storage.clearAll();
        showAuthPageView();
    }
});

// Start
document.addEventListener('DOMContentLoaded', startup);

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) navigate(e.state.page);
});
