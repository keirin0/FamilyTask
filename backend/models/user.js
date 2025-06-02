const db = require('../db');

const User = {
    create: (username, password, role, parent_id, callback) => {
        const sql = `INSERT INTO users (username, password, role, parent_id) VALUES (?, ?, ?, ?)`;
        db.run(sql, [username, password, role, parent_id], callback);
    },
    findByUsername: (username, callback) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        db.get(sql, [username], callback);
    },
    getChildren: (parentId, callback) => {
        const sql = `SELECT * FROM users WHERE parent_id = ?`;
        db.all(sql, [parentId], callback);
    },
    login: (username, password, callback) => {
        const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.get(sql, [username, password], callback);
    },
    updatePoints: (userId, pointsToAdd, callback) => {
    const sql = `UPDATE users SET total_points = total_points + ? WHERE id = ?`;
    db.run(sql, [pointsToAdd, userId], callback);
    }
};

module.exports = User;
