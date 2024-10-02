const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

module.exports = async () => {
    try {
        const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@budget-manager.cjvzd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
        await mongoose.connect(mongoURI)
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err.message);
        process.exit(1)
    }
}