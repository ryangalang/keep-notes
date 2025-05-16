const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all notes
router.get('/', (req, res) => {
  db.query('SELECT * FROM notes', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add note
router.post('/', (req, res) => {
  const { title, content, type } = req.body;
  if (!title || !content || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db.query(
    'INSERT INTO notes (title, content, type) VALUES (?, ?, ?)',
    [title, content, type],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId });
    }
  );
});

// Update note
router.put('/:id', (req, res) => {
  const { title, content, type } = req.body;
  if (!title || !content || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db.query(
    'UPDATE notes SET title = ?, content = ?, type = ? WHERE id = ?',
    [title, content, type, req.params.id],
    (err) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Delete note
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM notes WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

module.exports = router;
