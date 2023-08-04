const Order = require('../models/order');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const createNewOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const userCart = await User.findById(_id).select('cart');

    return res.json({
        success: response ? true : false,
        createdOrder: response ? response : 'Cannot create',
    });
});

module.exports = {
    createNewOrder,
};
