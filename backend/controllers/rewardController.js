// rewardController.js
const Reward = require('../models/reward');

exports.createReward = (req, res) => {
    const { child_id, points_required, reward_name } = req.body;
    Reward.create(child_id, points_required, reward_name, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Reward created successfully' });
    });
};

exports.getRewardsForChild = (req, res) => {
    const child_id = req.query.child_id; // Змінимо з req.user.id на req.query.child_id
    if (!child_id) {
        return res.status(400).json({ error: 'child_id is required' });
    }
    Reward.getByChildId(child_id, function(err, rows) {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
};

exports.claimReward = (req, res) => {
    const rewardId = req.params.id;
    Reward.claimReward(rewardId, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Reward claimed' });
    });
};

exports.getRewardsForParent = (req, res) => {
    const parent_id = req.query.parent_id; // Також змінимо тут
    if (!parent_id) {
        return res.status(400).json({ error: 'parent_id is required' });
    }
    Reward.getByParentId(parent_id, function(err, rows) {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
};
