const mongoose = require('mongoose');

// Define the Income schema
const IncomeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Income name missing"]
    },
    amount: {
        type: Number,
        required: [true, "Income amount missing"]
    },
    date: {
        type: Date,
        required: [true, "Income date missing"]
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

// Create the Income model
const Income = mongoose.model('Income', IncomeSchema);

// Export the Income model
module.exports = Income;