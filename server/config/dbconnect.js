const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn.connection.readyState === 1) {
            console.log('DB connection is successful!');
        } else {
            console.log('DB connection is not successful!');
        }
    } catch (err) {
        console.log('DB connection error: ' + err);
        throw new Error(err);
    }
};

module.exports = dbConnect;
