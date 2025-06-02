const db = require('../db');

const Task = {
    create: (title, description, child_id, parent_id, points, due_date, callback) => {
        const sql = `INSERT INTO tasks (title, description, child_id, parent_id, points, due_date) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(sql, [title, description, child_id, parent_id, points, due_date], callback);
    },

    getByChildId: (child_id, callback) => {
        const sql = `SELECT * FROM tasks WHERE child_id = ?`;
        db.all(sql, [child_id], callback);
    },

    markCompleted: (id, callback) => {
        const sql = `UPDATE tasks SET completed = 1 WHERE id = ?`;
        db.run(sql, [id], callback);
    },
    getById: (id, callback) => {
    const sql = `SELECT * FROM tasks WHERE id = ?`;
    db.get(sql, [id], callback);
    }
};

module.exports = Task;
