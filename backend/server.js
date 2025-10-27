const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Ensure db directory exists
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Database setup
const dbPath = path.join(dbDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('✓ Connected to SQLite database');
});

// Create todos table
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0,
    priority TEXT,
    dueDate TEXT,
    tags TEXT,
    createdAt TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('✓ Todos table ready');
  }
});

// API Routes

// GET /api/todos - Fetch all todos
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('GET /api/todos error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    // Parse JSON fields
    const todos = rows.map(row => ({
      ...row,
      completed: Boolean(row.completed),
      tags: row.tags ? JSON.parse(row.tags) : null
    }));
    
    res.json(todos);
  });
});

// POST /api/todos - Create a new todo
app.post('/api/todos', (req, res) => {
  const { title, priority, dueDate, tags } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const createdAt = new Date().toISOString();
  const tagsJson = tags ? JSON.stringify(tags) : null;
  
  db.run(
    'INSERT INTO todos (title, completed, priority, dueDate, tags, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
    [title.trim(), 0, priority || null, dueDate || null, tagsJson, createdAt],
    function(err) {
      if (err) {
        console.error('POST /api/todos error:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      // Fetch the created todo
      db.get('SELECT * FROM todos WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        
        const todo = {
          ...row,
          completed: Boolean(row.completed),
          tags: row.tags ? JSON.parse(row.tags) : null
        };
        
        res.status(201).json(todo);
      });
    }
  );
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed, title, priority, dueDate, tags } = req.body;
  
  // Check if todo exists
  db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('PUT /api/todos/:id error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    
    if (completed !== undefined) {
      updates.push('completed = ?');
      values.push(completed ? 1 : 0);
    }
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({ error: 'Title cannot be empty' });
      }
      updates.push('title = ?');
      values.push(title.trim());
    }
    if (priority !== undefined) {
      updates.push('priority = ?');
      values.push(priority);
    }
    if (dueDate !== undefined) {
      updates.push('dueDate = ?');
      values.push(dueDate);
    }
    if (tags !== undefined) {
      updates.push('tags = ?');
      values.push(tags ? JSON.stringify(tags) : null);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(id);
    
    db.run(
      `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`,
      values,
      function(err) {
        if (err) {
          console.error('PUT /api/todos/:id update error:', err.message);
          return res.status(500).json({ error: 'Internal server error' });
        }
        
        // Fetch updated todo
        db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }
          
          const todo = {
            ...row,
            completed: Boolean(row.completed),
            tags: row.tags ? JSON.parse(row.tags) : null
          };
          
          res.json(todo);
        });
      }
    );
  });
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  
  // Check if todo exists
  db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('DELETE /api/todos/:id error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('DELETE /api/todos/:id delete error:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      res.status(204).send();
    });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🚀 Backend API Server Running             ║
║  📍 http://localhost:${PORT}                  ║
║  📊 Database: ${dbPath}  ║
║  ✅ Ready for requests                     ║
╚════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('✓ Database connection closed');
    }
    process.exit(0);
  });
});
