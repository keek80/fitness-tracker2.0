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
        page.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔒</div>
                <p>Access Denied</p>
                <small>Admin access required.</small>
            </div>
        `;
        return;
    }

    page.innerHTML = `
        <div class="section-title">🛠️ Admin - User Support</div>
        
        <div class="card">
            <div class="card-title">Password Reset</div>
            <p style="font-size:13px; color:var(--text-muted); margin-bottom:12px;">
                Send a password reset email to any user.
            </p>
            <input type="email" id="adminResetEmail" class="form-input" placeholder="user@example.com" style="margin-bottom:8px;">
            <button class="btn btn-primary" onclick="sendPasswordReset()">📧 Send Password Reset Email</button>
            <div id="adminResetStatus" style="margin-top:12px; font-size:13px;"></div>
        </div>

        <div class="card" style="margin-top:16px;">
            <div class="card-title">Registered Users</div>
            <button class="btn btn-secondary" onclick="loadUserList()">🔄 Refresh User List</button>
            <div id="userList" style="margin-top:12px; max-height:400px; overflow-y:auto;"></div>
        </div>
    `;

    loadUserList(); // Auto load
}

async function sendPasswordReset() {
    const emailInput = document.getElementById('adminResetEmail');
    const statusEl = document.getElementById('adminResetStatus');
    const email = emailInput.value.trim();

    if (!email) {
        statusEl.innerHTML = `<span style="color:#ef4444">Please enter an email.</span>`;
        return;
    }

    statusEl.innerHTML = `Sending to <strong>${email}</strong>...`;

    try {
        await SupabaseAuth.resetPassword(email);
        statusEl.innerHTML = `<span style="color:#22c55e">✅ Reset email sent to ${email}</span>`;
        emailInput.value = '';
    } catch (err) {
        statusEl.innerHTML = `<span style="color:#ef4444">Error: ${err.message}</span>`;
    }
}

async function loadUserList() {
    const listEl = document.getElementById('userList');
    listEl.innerHTML = '<p>Loading...</p>';

    try {
        const { data, error } = await _supabase
            .from('profiles')
            .select('email, full_name, created_at')
            .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
            listEl.innerHTML = '<p>No users found or access restricted.</p>';
            return;
        }

        let html = '';
        data.forEach(user => {
            html += `
                <div style="border:1px solid var(--border); padding:10px; border-radius:8px; margin-bottom:8px;">
                    <strong>${user.email}</strong><br>
                    <small>${user.full_name || 'No name'} • Joined ${new Date(user.created_at).toLocaleDateString()}</small>
                </div>`;
        });
        listEl.innerHTML = html;
    } catch (err) {
        listEl.innerHTML = `<p style="color:#ef4444">Error loading users.</p>`;
    }
}
