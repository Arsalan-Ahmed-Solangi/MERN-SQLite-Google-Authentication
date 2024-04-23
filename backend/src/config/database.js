
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS accounts (
      AccountId INTEGER PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(100),
      phone VARCHAR(16),
      password VARCHAR(50),
      birthday DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});


module.exports = db;
