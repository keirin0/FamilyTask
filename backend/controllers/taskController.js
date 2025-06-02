const Task = require('../models/Task');
const User = require('../models/user'); 

// Створення завдання
exports.createTask = (req, res) => {
    const { title, description, child_id, parent_id, points, due_date } = req.body;

    if (!title || !child_id || !parent_id || !points) {
        return res.status(400).json({ error: 'Необхідно вказати title, child_id, parent_id та points' });
    }

    Task.create(title, description, child_id, parent_id, points, due_date, (err) => {
        if (err) {
            console.error('Помилка при створенні завдання:', err);
            return res.status(500).json({ error: 'Не вдалося створити завдання' });
        }

        res.status(201).json({ message: 'Завдання створено успішно' });
    });
};

// Отримати завдання для дитини
exports.getTasksForChild = (req, res) => {
    const childId = req.query.child_id;

    if (!childId) {
        return res.status(400).json({ error: 'Не вказано child_id' });
    }

    Task.getByChildId(childId, (err, rows) => {
        if (err) {
            console.error('Помилка при отриманні завдань для дитини:', err);
            return res.status(500).json({ error: 'Не вдалося отримати завдання' });
        }

        res.json(rows);
    });
};

// Позначити завдання як виконане
exports.markTaskCompleted = (req, res) => {
    const taskId = req.params.id;

    if (!taskId) {
        return res.status(400).json({ error: 'Не вказано id завдання' });
    }

    Task.markCompleted(taskId, (err) => {
        if (err) {
            console.error('Помилка при оновленні завдання:', err);
            return res.status(500).json({ error: 'Не вдалося позначити завдання як виконане' });
        }

        res.json({ message: 'Завдання позначено як виконане' });
    });
};
exports.markTaskCompleted = (req, res) => {
    const taskId = req.params.id;

    if (!taskId) {
        return res.status(400).json({ error: 'Не вказано id завдання' });
    }

    // Спочатку отримуємо завдання, щоб дізнатися скільки балів нараховувати
    Task.getById(taskId, (err, task) => {
        if (err) {
            console.error('Помилка при отриманні завдання:', err);
            return res.status(500).json({ error: 'Не вдалося отримати завдання' });
        }

        if (!task) {
            return res.status(404).json({ error: 'Завдання не знайдено' });
        }

        // Якщо завдання вже виконане, не робимо нічого
        if (task.completed) {
            return res.status(400).json({ error: 'Завдання вже виконане' });
        }

        // Позначаємо завдання як виконане
        Task.markCompleted(taskId, (err) => {
            if (err) {
                console.error('Помилка при оновленні завдання:', err);
                return res.status(500).json({ error: 'Не вдалося позначити завдання як виконане' });
            }

            // Нараховуємо бали дитині
            User.updatePoints(task.child_id, task.points, (err) => {
                if (err) {
                    console.error('Помилка при оновленні балів:', err);
                    // Можна повернути помилку або просто залоггувати, оскільки завдання вже позначено як виконане
                }

                res.json({ 
                    message: 'Завдання позначено як виконане', 
                    pointsAdded: task.points 
                });
            });
        });
    });
};
