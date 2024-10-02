const mongoose = require('mongoose');

// Define the Expense schema
const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Expense name missing"]
    },
    amount: {
        type: Number,
        required: [true, "Expense amount missing"]
    },
    date: {
        type: Date,
        required: [true, "Expense date missing"]
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category ID missing"]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID missing"]
    }
});

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;