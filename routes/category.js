const express = require('express');
const router = express.Router();
const db = require('../db/db')
const isAuthenticated = require('./middleware');

/* GET user categorys */
router.get('/', isAuthenticated, function (req, res, next) {
    let sql = "SELECT * FROM category WHERE user_id = ?"

    db.all(sql, [req.user.id], (err, data) => {
        if (err)
            return res.status(404).json({ error: err.message })

        res.json(data)
    })
});

router.get('/:type', isAuthenticated, function (req, res, next) {
    let sql = "SELECT * FROM category WHERE type = ? AND user_id = ?"

    db.all(sql, [req.params.type, req.user.id], (err, data) => {
        if (err)
            return res.status(404).json({ error: err.message })

        res.json(data)
    })
});

router.post('/', isAuthenticated, function (req, res, next) {
    const { name, type } = req.body

    let sql = "INSERT INTO category (name, type, user_id) VALUES (?, ?, ?)"
    db.run(sql, [name, type, req.user.id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Category added successfully' });
    })
})

router.put('/', isAuthenticated, function (req, res, next) {
    const { category_id, name, type } = req.body

    let sql = "UPDATE category SET name = ?, type = ? WHERE id = ?"
    db.run(sql, [category_id, name, type], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Category updated successfully' });
    })
})

router.delete('/', isAuthenticated, function (req, res, next) {
    const { category_id } = req.body

    let sql = "DELETE FROM category WHERE id = ?"
    db.run(sql, [category_id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        res.json({ message: 'Category deleted successfully' });
    })
})

module.exports = router;