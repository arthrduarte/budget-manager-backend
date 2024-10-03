const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel')
const db = require('../db/db')
const isAuthenticated = require('./middleware');

/* GET user categories */
router.get('/', isAuthenticated, async (req, res, next) => {
    try {
        const categories = await Category.find({ user_id: req.user.id })
        return res.status(200).json({ categories })
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }
});

router.get('/:type', isAuthenticated, async (req, res, next) => {
    let sql = "SELECT * FROM category WHERE type = ? AND user_id = ?"

    if (req.params.type != 'income' && req.params.type != 'expense')
        return res.status(404).json({ error: "Invalid category type" })

    try {
        const categories = await Category.find({ type: req.params.type, user_id: req.user.id })
        return res.status(200).json({ categories })
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }
});

router.post('/', isAuthenticated, async (req, res, next) => {
    const { name, type } = req.body

    try {
        const category = new Category({
            name,
            type,
            user_id: req.user.id
        })

        await category.save()
        return res.status(201).json({ message: "Category added successfully" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

router.put('/', isAuthenticated, async (req, res, next) => {
    const { category_id, name, type } = req.body

    try {
        const category = await Category.findByIdAndUpdate(
            category_id,
            {
                name,
                type
            },
            { new: true }
        )
        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }

        return res.status(200).json({ message: "Category updated successfully" })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.delete('/', isAuthenticated, async (req, res, next) => {
    const { category_id } = req.body

    try {
        const category = await Category.findByIdAndDelete(category_id)

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        return res.status(200).json({ message: 'Category deleted successfully' });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

module.exports = router;