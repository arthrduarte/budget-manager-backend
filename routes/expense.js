const express = require('express');
const router = express.Router();
const Expense = require('../models/expenseModel')
const db = require('../db/db')
const isAuthenticated = require('./middleware');

/* GET user expenses */
router.get('/', isAuthenticated, async (req, res, next) => {
    console.log(req.user.id)
    try {
        const expenses = await Expense.find({ user_id: req.user.id })
        return res.status(200).json({ expenses })
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }
});

// GET expense by date (/expense/2024-09)
router.get('/:date', isAuthenticated, async (req, res, next) => {
    const [year, month] = req.params.date.split('-');
    console.log(req.user.id)
    console.log(`Year: ${year}, Month: ${month}`);

    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    try {
        const expenses = await Expense.find({
            user_id: req.user.id,
            date: {
                $gte: startDate,
                $lt: endDate
            }
        });
        return res.status(200).json({ expenses });
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
});

router.post('/', isAuthenticated, async (req, res, next) => {
    const { name, amount, date, category } = req.body;

    try {
        const expense = new Expense({
            name,
            amount,
            date: new Date(date),
            category,
            user_id: req.user.id
        });

        await expense.save();
        return res.status(201).json({ message: 'Expense added successfully', id: expense._id });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.put('/', isAuthenticated, async (req, res, next) => {
    const { expense_id, name, amount, date, category } = req.body;

    try {
        const expense = await Expense.findByIdAndUpdate(
            expense_id,
            {
                name,
                amount,
                date: new Date(date),
                category
            },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        return res.status(200).json({ message: 'Expense updated successfully', expense });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.delete('/', isAuthenticated, async (req, res, next) => {
    const { expense_id } = req.body

    try {
        const expense = await Expense.findByIdAndDelete(expense_id);

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        return res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

})

module.exports = router;