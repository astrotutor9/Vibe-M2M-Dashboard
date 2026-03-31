const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Database helper
const DB_PATH = path.join(__dirname, 'data');
const readDb = async (file) => fs.readJson(path.join(DB_PATH, `${file}.json`));
const writeDb = async (file, data) => fs.writeJson(path.join(DB_PATH, `${file}.json`), data, { spaces: 2 });

// Basic API Routes
app.get('/api/event', async (req, res) => {
  try {
    const event = await readDb('event');
    res.json(event || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to read event data' });
  }
});

app.post('/api/event', async (req, res) => {
  try {
    const { start_datetime, end_datetime, admin_password, current_testing_rate, status } = req.body;
    
    // Basic validation
    if (!admin_password) {
      return res.status(400).json({ error: 'Admin password is required' });
    }

    const eventData = {
      id: 'event-config',
      start_datetime,
      end_datetime,
      admin_password,
      current_testing_rate: parseFloat(current_testing_rate) || 250,
      status: status || 'upcoming'
    };

    await writeDb('event', eventData);
    res.json({ message: 'Event configuration saved successfully', event: eventData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save event data' });
  }
});

app.get('/api/teams', async (req, res) => {
  try {
    const teams = await readDb('teams');
    res.json(teams || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read teams data' });
  }
});

app.post('/api/teams', async (req, res) => {
  try {
    const { name, id } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }

    let teams = await readDb('teams');
    if (!Array.isArray(teams)) teams = [];

    if (id) {
      // Update existing team
      const index = teams.findIndex(t => t.id === id);
      if (index !== -1) {
        teams[index].name = name;
      } else {
        return res.status(404).json({ error: 'Team not found' });
      }
    } else {
      // Add new team
      const newId = `team-${Date.now()}`;
      teams.push({ id: newId, name });
    }

    await writeDb('teams', teams);
    res.json({ message: 'Team saved successfully', teams });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save team data' });
  }
});

app.delete('/api/teams/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let teams = await readDb('teams');
    if (!Array.isArray(teams)) teams = [];

    const newTeams = teams.filter(t => t.id !== id);
    if (newTeams.length === teams.length) {
      return res.status(404).json({ error: 'Team not found' });
    }

    await writeDb('teams', newTeams);
    res.json({ message: 'Team deleted successfully', teams: newTeams });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

app.get('/api/stories', async (req, res) => {
  try {
    const stories = await readDb('stories');
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read stories data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
