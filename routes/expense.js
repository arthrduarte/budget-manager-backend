const express = require('express');
const router = express.Router();
const db = require('../db/db')
const isAuthenticated = require('./middleware');

/* GET user expenses */
router.get('/', isAuthenticated, function (req, res, next) {
    let sql = "SELECT * FROM expense WHERE user_id = ?"

    db.all(sql, [req.user.id], (err, data) => {
        if (err)
            return res.status(404).json({ error: err.message })

        res.json(data)
    })
});

// GET expense by date (/expense/2024-09)
router.get('/:date', isAuthenticated, function (req, res, next) {
    const [year, month] = req.params.date.split('-');

    let sql = "SELECT expense.id, expense.name, expense.amount, expense.date, category.name AS category_name FROM expense INNER JOIN category ON expense.category_id = category.id WHERE expense.date = ? AND expense.user_id = ?";
    db.all(sql, [`${year}-${month}`,req.user.id], (err, data) => {
        if (err)
            return res.status(404).json({ error: err.message })

        res.json(data)
    })
});

router.post('/', isAuthenticated, function(req, res, next){
    const {name, amount, date, category_id} = req.body
    
    let sql = "INSERT INTO expense (name, amount, date, category_id, user_id) VALUES (?, ?, ?, ?, ?)"
    db.run(sql, [name, amount, date, category_id, req.user.id], function (err){
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Expense added successfully' });
    })
})

router.put('/', isAuthenticated, function(req, res, next){
    const {expense_id, name, amount, date, category_id} = req.body

    let sql = "UPDATE expense SET name = ?, amount = ?, date = ?, category_id = ? WHERE id = ?"
    db.run(sql, [name, amount, date, category_id, expense_id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Expense updated successfully' });
    })
})

router.delete('/', isAuthenticated, function (req, res, next) {
    const {expense_id} = req.body

    let sql = "DELETE FROM expense WHERE id = ?"
    db.run(sql, [expense_id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Expense deleted successfully' });
    })
})

module.exports = router;