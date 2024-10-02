const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name missing"]
    },
    type: {
        type: String,
        required: [true, "Category type missing"]
    },
    user_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID missing"]
    }
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
