from flask import Flask, jsonify, request, g
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
DATABASE = 'todos.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed BOOLEAN DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        db.commit()

@app.route('/api/todos', methods=['GET'])
def get_todos():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM todos ORDER BY created_at DESC')
    todos = [dict(row) for row in cursor.fetchall()]
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    data = request.json
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'INSERT INTO todos (title, completed) VALUES (?, ?)',
        (data['title'], data.get('completed', False))
    )
    db.commit()
    
    # Return the newly created todo
    todo_id = cursor.lastrowid
    cursor.execute('SELECT * FROM todos WHERE id = ?', (todo_id,))
    return jsonify(dict(cursor.fetchone())), 201

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    db = get_db()
    cursor = db.cursor()
    
    # Check if todo exists
    cursor.execute('SELECT * FROM todos WHERE id = ?', (todo_id,))
    if not cursor.fetchone():
        return jsonify({'error': 'Todo not found'}), 404
    
    # Update the todo
    cursor.execute(
        'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
        (data.get('title'), data.get('completed'), todo_id)
    )
    db.commit()
    
    # Return the updated todo
    cursor.execute('SELECT * FROM todos WHERE id = ?', (todo_id,))
    return jsonify(dict(cursor.fetchone()))

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    db = get_db()
    cursor = db.cursor()
    
    # Check if todo exists
    cursor.execute('SELECT * FROM todos WHERE id = ?', (todo_id,))
    if not cursor.fetchone():
        return jsonify({'error': 'Todo not found'}), 404
    
    cursor.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
    db.commit()
    return '', 204

if __name__ == '__main__':
    # Initialize the database
    if not os.path.exists(DATABASE):
        init_db()
    
    # Run the Flask app
    app.run(port=5001, debug=True)
