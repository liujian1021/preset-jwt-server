const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = process.env.SECRET;
const TEAM_ID = process.env.TEAM_ID;
const WORKSPACE_ID = process.env.WORKSPACE_ID;

app.post('/generate-token', (req, res) => {
  const dashboardId = req.body.dashboard_id;

  if (!dashboardId) {
    return res.status(400).json({ error: 'Missing dashboard_id' });
  }

  const payload = {
    user: {
      username: 'frontend-guest',
    },
    resources: [
      {
        type: 'dashboard',
        id: dashboardId,
      },
    ],
    metadata: {
      team_id: TEAM_ID,
      workspace_id: WORKSPACE_ID,
    },
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`JWT Server running on port ${PORT}`);
});
