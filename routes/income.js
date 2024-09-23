const express = require('express');
const router = express.Router();
const db = require('../db/db')
const isAuthenticated = require('./middleware');

/* GET user incomes */
router.get('/', isAuthenticated, function (req, res, next) {
    let sql = "SELECT * FROM income WHERE user_id = ?"

    db.all(sql, [req.user.id], (err, data) => {
        if (err)
            return res.status(404).json({ error: err.message })

        res.json(data)
    })
});

// GET income by date (/income/2024-09)
router.get('/:date', isAuthenticated, function (req, res, next) {
    const [year, month] = req.params.date.split('-');

    let sql = "SELECT income.id, income.name, income.amount, income.date, category.name AS category_name FROM income INNER JOIN category ON income.category_id = category.id WHERE income.date = ? AND income.user_id = ?";
    db.all(sql, [year, month, req.user.id], (err, data) => {
        if (err)
            return res.status(404).json({ error: err.message })

        res.json(data)
    })
});

router.post('/', isAuthenticated, function (req, res, next) {
    const { name, amount, date, category_id } = req.body

    let sql = "INSERT INTO income (name, amount, date, category_id, user_id) VALUES (?, ?, ?, ?, ?)"
    db.run(sql, [name, amount, date, category_id, req.user.id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Income added successfully' });
    })
})

router.put('/', isAuthenticated, function (req, res, next) {
    const { income_id, name, amount, date, category_id } = req.body

    let sql = "UPDATE income SET name = ?, amount = ?, date = ?, category_id = ? WHERE id = ?"
    db.run(sql, [name, amount, date, category_id, income_id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Income updated successfully' });
    })
})

router.delete('/', isAuthenticated, function (req, res, next) {
    const { income_id } = req.body

    let sql = "DELETE FROM income WHERE id = ?"
    db.run(sql, [income_id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Income deleted successfully' });
    })
})

module.exports = router;