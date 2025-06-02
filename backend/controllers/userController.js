const User = require('../models/user');

exports.register = (req, res) => {
    const { username, password, role, parent_id } = req.body;
    User.create(username, password, role, parent_id, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'User created successfully' });
    });
};

exports.getChildren = (req, res) => {
    const parentId = req.query.parent_id;
    if (!parentId) {
        return res.status(400).json({ error: 'parent_id is required' });
    }
    User.getChildren(parentId, function(err, rows) {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
};

// POST /api/login
exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    User.login(username, password, function(err, user) {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: 'Invalid username or password' });

        // Успішний логін
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                parent_id: user.parent_id,
                total_points: user.total_points
            }
        });
    });
};
