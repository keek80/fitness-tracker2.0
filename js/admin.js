// ========== ADMIN PAGE ==========
const ADMIN_EMAILS = ['keek@comcast.net']; // ← Change this to your actual email

function isAdmin() {
    const email = SupabaseAuth.getUserEmail();
    return email && ADMIN_EMAILS.includes(email.toLowerCase());
}

function renderAdmin() {
    const page = document.getElementById('page-admin');
    if (!page) return;

    // Hide page if not admin
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

    // The HTML is already in index.html, so we just make sure it's visible
    console.log('Admin page loaded');
}

function sendPasswordReset() {
    const emailInput = document.getElementById('adminResetEmail');
    const statusEl = document.getElementById('adminResetStatus');
    
    const email = emailInput.value.trim();
    if (!email) {
        statusEl.innerHTML = `<span style="color:#ef4444">Please enter an email address.</span>`;
        return;
    }

    statusEl.innerHTML = `Sending reset email to <strong>${email}</strong>...`;

    SupabaseAuth.resetPassword(email)
        .then(() => {
            statusEl.innerHTML = `<span style="color:#22c55e">✅ Password reset email sent to ${email}</span>`;
            emailInput.value = '';
        })
        .catch(err => {
            console.error(err);
            statusEl.innerHTML = `<span style="color:#ef4444">Error: ${err.message}</span>`;
        });
}

function copyCurrentUserEmail() {
    const email = SupabaseAuth.getUserEmail();
    if (email) {
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard');
        });
    }
}
