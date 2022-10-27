require("dotenv").config();
const mongoose = require("mongoose");
module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,

        };
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://idaka123:Idaka123@cluster0.v1iva2b.mongodb.net/test', connectionParams);
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
};
