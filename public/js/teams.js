document.addEventListener('DOMContentLoaded', () => {
    const teamForm = document.getElementById('team-form');
    const teamsContainer = document.getElementById('teams-container');
    const messageDiv = document.getElementById('message');
    const teamIdInput = document.getElementById('team-id');
    const teamNameInput = document.getElementById('name');
    const submitBtn = document.getElementById('submit-btn');
    const cancelEditBtn = document.getElementById('cancel-edit');

    // Fetch and display teams
    const fetchTeams = () => {
        fetch('/api/teams')
            .then(response => response.json())
            .then(teams => {
                displayTeams(teams);
            })
            .catch(err => {
                console.error('Failed to fetch teams:', err);
                messageDiv.textContent = 'Error: Failed to load teams';
                messageDiv.className = 'message error';
            });
    };

    const displayTeams = (teams) => {
        if (!teams || teams.length === 0) {
            teamsContainer.innerHTML = '<p class="empty-msg">No teams added yet.</p>';
            return;
        }

        teamsContainer.innerHTML = '';
        teams.forEach(team => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team-item';
            teamDiv.innerHTML = `
                <span>${team.name}</span>
                <div>
                    <button class="btn btn-edit" data-id="${team.id}" data-name="${team.name}">Edit</button>
                    <button class="btn btn-delete" data-id="${team.id}">Delete</button>
                </div>
            `;
            teamsContainer.appendChild(teamDiv);
        });

        // Add event listeners for edit and delete
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const name = e.target.dataset.name;
                startEdit(id, name);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                deleteTeam(id);
            });
        });
    };

    const startEdit = (id, name) => {
        teamIdInput.value = id;
        teamNameInput.value = name;
        submitBtn.textContent = 'Update Team';
        cancelEditBtn.style.display = 'block';
        teamNameInput.focus();
    };

    const cancelEdit = () => {
        teamIdInput.value = '';
        teamNameInput.value = '';
        submitBtn.textContent = 'Add Team';
        cancelEditBtn.style.display = 'none';
        messageDiv.style.display = 'none';
    };

    cancelEditBtn.addEventListener('click', cancelEdit);

    const deleteTeam = (id) => {
        if (!confirm('Are you sure you want to delete this team?')) return;

        fetch(`/api/teams/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                if (result.teams) {
                    displayTeams(result.teams);
                    messageDiv.textContent = 'Team deleted successfully';
                    messageDiv.className = 'message success';
                }
            })
            .catch(err => {
                console.error('Failed to delete team:', err);
                messageDiv.textContent = 'Error: Failed to delete team';
                messageDiv.className = 'message error';
            });
    };

    // Handle form submission
    teamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = {
            id: teamIdInput.value,
            name: teamNameInput.value
        };

        fetch('/api/teams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.teams) {
                displayTeams(result.teams);
                cancelEdit();
                messageDiv.textContent = result.message;
                messageDiv.className = 'message success';
                messageDiv.style.display = 'block';
            } else if (result.error) {
                messageDiv.textContent = 'Error: ' + result.error;
                messageDiv.className = 'message error';
                messageDiv.style.display = 'block';
            }
        })
        .catch(err => {
            console.error('Error saving team:', err);
            messageDiv.textContent = 'Error: Failed to save team';
            messageDiv.className = 'message error';
            messageDiv.style.display = 'block';
        });
    });

    fetchTeams();
});
