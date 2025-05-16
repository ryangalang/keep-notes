const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/notes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/notes', noteRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.0.17:${PORT}`);
});
