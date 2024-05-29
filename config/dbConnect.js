const {mongoose} = require('mongoose');

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected Successfully");
    } catch (error) {
        console.log("Connection Failed");
    }
};
    module.exports = dbConnect;
