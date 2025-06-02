const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const db = require('./db');

// Middlewares
app.use(cors());
app.use(express.json());  // цього достатньо для парсингу JSON
app.use(express.urlencoded({ extended: true }));


// Роутери
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const rewardRoutes = require('./routes/rewardRoutes');



app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/rewards', rewardRoutes);

app.get('/', (req, res) => {
  res.send('FamilyTasks API працює 🚀');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
});
