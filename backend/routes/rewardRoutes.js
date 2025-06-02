// rewardRoutes.js
const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

// POST /api/rewards
router.post('/', rewardController.createReward);

// GET /api/rewards (для дитини)
router.get('/', rewardController.getRewardsForChild);

// PUT /api/rewards/:id/claim
router.put('/:id/claim', rewardController.claimReward);

// ДОДАЄМО новий маршрут для батьків
router.get('/parent', rewardController.getRewardsForParent);

module.exports = router;
