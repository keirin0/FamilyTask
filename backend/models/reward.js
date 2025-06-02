// reward.js
const db = require('../db');

const Reward = {
    create: (child_id, points_required, reward_name, callback) => {
        const sql = `INSERT INTO rewards (child_id, points_required, reward_name) VALUES (?, ?, ?)`;
        db.run(sql, [child_id, points_required, reward_name], callback);
    },

    getByChildId: (child_id, callback) => {
        const sql = `SELECT * FROM rewards WHERE child_id = ?`;
        db.all(sql, [child_id], callback);
    },

    claimReward: (id, callback) => {
        const sql = `UPDATE rewards SET claimed = 1 WHERE id = ?`;
        db.run(sql, [id], callback);
    },

    // ДОДАЄМО нову функцію
    getByParentId: (parent_id, callback) => {
        const sql = `
            SELECT rewards.*, users.username AS child_name
            FROM rewards
            JOIN users ON rewards.child_id = users.id
            WHERE users.parent_id = ?
        `;
        db.all(sql, [parent_id], callback);
    }
};

module.exports = Reward;
