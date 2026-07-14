// ========== ADMIN PAGE ==========
const ADMIN_EMAILS = ['your-actual-email@gmail.com']; // ← Update this

function isAdmin() {
    const email = SupabaseAuth.getUserEmail();
    return email && ADMIN_EMAILS.includes(email.toLowerCase());
}

async function renderAdmin() {
    const page = document.getElementById('page-admin');
    if (!page) return;

    if (!isAdmin()) {
        page.innerHTML = `<div class="empty-state"><div class="empty-icon">🔒</div><p>Access Denied</p></div>`;
        return;
    }

    page.innerHTML = `
        <div class="section-title">🛠️ Admin - User Support</div>
        
        <!-- Password Reset -->
        <div class="card">
            <div class="card-title">Send Password Reset Email</div>
            <input type="email" id="adminResetEmail" class="form-input" placeholder="user@example.com" style="margin-bottom:8px;">
            <button class="btn btn-primary" onclick="sendPasswordReset()">📧 Send Reset Email</button>
            <div id="adminResetStatus" style="margin-top:12px; font-size:13px;"></div>
        </div>

        <!-- Force Set Password -->
        <div class="card" style="margin-top:16px;">
            <div class="card-title">Force Set Password (Direct)</div>
            <input type="email" id="forceEmail" class="form-input" placeholder="user@example.com" style="margin-bottom:8px;">
            <input type="password" id="forcePassword" class="form-input" placeholder="New password (min 6 chars)" style="margin-bottom:8px;">
            <button class="btn btn-danger" onclick="forceSetPassword()">🔑 Force Set Password</button>
            <div id="forceStatus" style="margin-top:12px; font-size:13px;"></div>
        </div>

        <!-- User List -->
        <div class="card" style="margin-top:16px;">
            <div class="card-title">Registered Users</div>
            <button class="btn btn-secondary" onclick="loadUserList()">🔄 Refresh</button>
            <div id="userList" style="margin-top:12px; max-height:400px; overflow-y:auto;"></div>
        </div>
    `;

    loadUserList();
}

async function sendPasswordReset() {
    const email = document.getElementById('adminResetEmail').value.trim();
    if (!email) return;
    const status = document.getElementById('adminResetStatus');
    status.innerHTML = 'Sending...';
    SupabaseAuth.resetPassword(email).then(() => {
        status.innerHTML = `<span style="color:#22c55e">Sent to ${email}</span>`;
    }).catch(err => status.innerHTML = `<span style="color:#ef4444">${err.message}</span>`);
}

async function forceSetPassword() {
    const email = document.getElementById('forceEmail').value.trim();
    const password = document.getElementById('forcePassword').value.trim();
    const status = document.getElementById('forceStatus');

    if (!email || !password || password.length < 6) {
        status.innerHTML = `<span style="color:#ef4444">Invalid email or password (min 6 chars)</span>`;
        return;
    }

    status.innerHTML = 'Setting password...';

    try {
        // Note: This requires the service role or admin privileges. For client-side, we can only do reset.
        // For now, we trigger a reset and notify
        await SupabaseAuth.resetPassword(email);
        status.innerHTML = `<span style="color:#22c55e">Reset email sent to ${email}. Use the link or dashboard to set password.</span>`;
    } catch (err) {
        status.innerHTML = `<span style="color:#ef4444">${err.message}</span>`;
    }
}

async function loadUserList() {
    // ... (keep your current loadUserList or the improved one from earlier)
}
