// Підключаємо sqlite3
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Створюємо шлях до файлу бази даних
const dbPath = path.resolve(__dirname, 'family.db');

// Відкриваємо з'єднання
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Помилка при підключенні до бази:', err.message);
  } else {
    console.log('✅ Підключено до бази даних SQLite (family.db)');
  }
});

module.exports = db;
