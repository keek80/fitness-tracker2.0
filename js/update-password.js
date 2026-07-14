function renderUpdatePassword() {
    // Optional: You can add extra UI logic here if needed
    console.log('Update password page loaded');
}

async function updateUserPassword() {
    const passwordInput = document.getElementById('newPasswordInput');
    const newPassword = passwordInput.value.trim();

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    try {
        const { error } = await _supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;

        alert('✅ Password updated successfully!');
        navigate('dashboard'); // or settings
    } catch (err) {
        alert('Error: ' + err.message);
    }
}
