// ========== ADMIN PAGE ==========
const ADMIN_EMAILS = ['keek@comcast.net'];

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
        <div class="section-title">🛠️ Admin - User Management</div>
        
        <div class="card">
            <div class="card-title">Quick Password Reset</div>
            <input type="email" id="quickResetEmail" class="form-input" placeholder="user@example.com">
            <button class="btn btn-primary" onclick="quickPasswordReset()">📧 Send Reset</button>
        </div>

        <div class="card" style="margin-top:16px;">
            <div class="card-title">All Users</div>
            <button class="btn btn-secondary" onclick="loadUserList()">🔄 Refresh</button>
            <div id="userList" style="margin-top:12px; max-height:500px; overflow-y:auto;"></div>
        </div>
    `;

    loadUserList();
}

async function quickPasswordReset() {
    const email = document.getElementById('quickResetEmail').value.trim();
    if (!email) return alert('Enter email');
    await SupabaseAuth.resetPassword(email);
    alert(`Reset email sent to ${email}`);
}

async function loadUserList() {
    const listEl = document.getElementById('userList');
    listEl.innerHTML = '<p>Loading...</p>';

    try {
        const { data, error } = await _supabase
            .from('profiles')
            .select('id, email, full_name, created_at, banned')
            .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
            listEl.innerHTML = '<p>No users found.</p>';
            return;
        }

        let html = '';
        data.forEach(user => {
            const status = user.banned ? '🚫 Banned' : '✅ Active';
            html += `
                <div style="border:1px solid var(--border); padding:12px; border-radius:8px; margin-bottom:8px;">
                    <strong>${user.email}</strong><br>
                    <small>${user.full_name || 'No name'} • ${status}</small><br>
                    <div style="margin-top:8px;">
                        <button onclick="sendResetToUser('${user.email}')" style="font-size:12px;">Reset Password</button>
                        <button onclick="toggleBan('${user.id}', ${!user.banned})" style="font-size:12px; margin-left:8px; color:${user.banned ? '#22c55e' : '#ef4444'}">
                            ${user.banned ? 'Unban' : 'Ban'}
                        </button>
                    </div>
                </div>`;
        });
        listEl.innerHTML = html;
    } catch (err) {
        listEl.innerHTML = `<p style="color:#ef4444">Error: ${err.message}</p>`;
    }
}

function sendResetToUser(email) {
    if (confirm(`Send password reset to ${email}?`)) {
        SupabaseAuth.resetPassword(email).then(() => alert('Sent!'));
    }
}

async function toggleBan(userId, ban) {
    if (!confirm(ban ? 'Ban this user?' : 'Unban this user?')) return;

    await _supabase
        .from('profiles')
        .update({ banned: ban })
        .eq('id', userId);

    alert(ban ? 'User banned.' : 'User unbanned.');
    loadUserList();
}
