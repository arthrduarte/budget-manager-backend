const express = require('express');
const router = express.Router();
const Income = require('../models/incomeModel')
const db = require('../db/db')
const isAuthenticated = require('./middleware');

/* GET user incomes */
router.get('/', isAuthenticated, async (req, res, next) => {
    console.log(req.user.id)
    try {
        const incomes = await Income.find({ user_id: req.user.id })
        return res.status(200).json({ incomes })
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }
});

// GET income by date (/income/2024-09)
router.get('/:date', isAuthenticated, async (req, res, next) => {
    const [year, month] = req.params.date.split('-');
    console.log(req.user.id)
    console.log(`Year: ${year}, Month: ${month}`);

    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    try {
        const incomes = await Income.find({
            user_id: req.user.id,
            date: {
                $gte: startDate,
                $lt: endDate
            }
        });
        return res.status(200).json({ incomes });
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
});

router.post('/', isAuthenticated, async (req, res, next) => {
    const { name, amount, date, category_id } = req.body;

    try {
        const income = new Income({
            name,
            amount,
            date: new Date(date),
            category_id,
            user_id: req.user.id
        });

        await income.save();
        return res.status(201).json({ message: 'Income added successfully', id: expense._id });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.put('/', isAuthenticated, async (req, res, next) => {
    const { expense_id, name, amount, date, category_id } = req.body;

    try {
        const income = await Income.findByIdAndUpdate(
            income_id,
            {
                name,
                amount,
                date: new Date(date),
                category_id
            },
            { new: true }
        );

        if (!income) {
            return res.status(404).json({ error: 'Income not found' });
        }

        return res.status(200).json({ message: 'Income updated successfully', expense });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.delete('/', isAuthenticated, async (req, res, next) => {
    const { income_id } = req.body

    try {
        const income = await Income.findByIdAndDelete(income_id);

        if (!income) {
            return res.status(404).json({ error: 'Income not found' });
        }

        return res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

})

module.exports = router;