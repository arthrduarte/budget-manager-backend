const sqlite3 = require('sqlite3').verbose();
const path = require('path')

// Connect to the SQLite database
let dbPath = path.join(__dirname, "budget-manager.db");
console.log(dbPath)
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
});

module.exports = db