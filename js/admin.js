// ========== ADMIN PAGE ==========
const ADMIN_EMAILS = ['keek@comcast.net']; // ← Update this

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

    // Full Admin UI
    page.innerHTML = `
        <div class="section-title">🛠️ Admin - User Support</div>
        
        <div class="card">
            <div class="card-title">Password Reset</div>
            <div class="form-group">
                <label class="form-label">User Email</label>
                <input type="email" id="adminResetEmail" class="form-input" placeholder="user@example.com">
            </div>
            <button class="btn btn-primary" onclick="sendPasswordReset()">📧 Send Password Reset Email</button>
            <div id="adminResetStatus" style="margin-top:12px; font-size:13px;"></div>
        </div>

        <div class="card" style="margin-top:16px;">
            <div class="card-title">Registered Users</div>
            <button class="btn btn-secondary" onclick="loadUserList()">🔄 Refresh User List</button>
            <div id="userList" style="margin-top:12px; max-height:400px; overflow-y:auto;"></div>
        </div>
    `;

    loadUserList(); // Load automatically
}

async function loadUserList() {
    const listEl = document.getElementById('userList');
    listEl.innerHTML = '<p>Loading users...</p>';

    try {
        // Try profiles table first
        let { data, error } = await _supabase
            .from('profiles')
            .select('id, email, full_name, created_at')
            .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
            // Fallback: try to get from auth.users (limited info)
            console.log('No profiles found, trying auth.users...');
            const { data: authUsers, error: authError } = await _supabase.auth.admin.listUsers();
            
            if (authError) throw authError;
            
            data = authUsers.users.map(u => ({
                id: u.id,
                email: u.email,
                full_name: u.user_metadata?.full_name || 'N/A',
                created_at: u.created_at
            }));
        }

        if (!data || data.length === 0) {
            listEl.innerHTML = '<p>No users found in database.</p>';
            return;
        }

        let html = '<div style="display:flex; flex-direction:column; gap:8px;">';
        data.forEach(user => {
            html += `
                <div style="border:1px solid var(--border); padding:12px; border-radius:8px; background:var(--bg-secondary);">
                    <strong>${user.email}</strong><br>
                    <small>${user.full_name || 'No name'} • Joined ${new Date(user.created_at).toLocaleDateString()}</small><br>
                    <button onclick="sendPasswordResetTo('${user.email}')" style="margin-top:8px; font-size:12px; padding:4px 8px;">Reset Password</button>
                </div>`;
        });
        html += '</div>';
        listEl.innerHTML = html;

    } catch (err) {
        console.error(err);
        listEl.innerHTML = `<p style="color:#ef4444">Error: ${err.message}<br><small>Make sure RLS allows admin read on profiles table.</small></p>`;
    }
}

function sendPasswordResetTo(email) {
    if (confirm(`Send password reset to ${email}?`)) {
        SupabaseAuth.resetPassword(email)
            .then(() => alert(`Reset email sent to ${email}`))
            .catch(err => alert('Error: ' + err.message));
    }
}
