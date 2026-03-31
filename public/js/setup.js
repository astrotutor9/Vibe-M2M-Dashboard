document.addEventListener('DOMContentLoaded', () => {
    const setupForm = document.getElementById('setup-form');
    const messageDiv = document.getElementById('message');

    // Fetch existing event configuration
    fetch('/api/event')
        .then(response => response.json())
        .then(data => {
            if (data && data.admin_password) {
                document.getElementById('start_datetime').value = data.start_datetime || '';
                document.getElementById('end_datetime').value = data.end_datetime || '';
                document.getElementById('admin_password').value = data.admin_password || '';
                document.getElementById('current_testing_rate').value = data.current_testing_rate || 250;
                document.getElementById('status').value = data.status || 'upcoming';
            }
        })
        .catch(err => {
            console.error('Failed to fetch event data:', err);
        });

    // Handle form submission
    setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(setupForm);
        const data = Object.fromEntries(formData.entries());

        messageDiv.textContent = 'Saving...';
        messageDiv.className = 'message';

        fetch('/api/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message) {
                messageDiv.textContent = result.message;
                messageDiv.className = 'message success';
            } else if (result.error) {
                messageDiv.textContent = 'Error: ' + result.error;
                messageDiv.className = 'message error';
            }
        })
        .catch(err => {
            console.error('Error saving event:', err);
            messageDiv.textContent = 'Error: Failed to save event configuration';
            messageDiv.className = 'message error';
        });
    });
});
