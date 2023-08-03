const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expire } = req.body;
    if (!name || !discount || !expire) throw new Error('Missing inputs');
    const response = await Coupon.create({
        ...req.body,
        expire: Date.now() + +expire * 24 * 60 * 60 * 1000,
    });
    return res.json({
        success: response ? true : false,
        createdCoupon: response ? response : 'Cannot create',
    });
});

const getCoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('name _id discount expire');
    return res.json({
        success: response ? true : false,
        coupons: response ? response : 'Cannot get',
    });
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    if (req.body.expire)
        req.body.expire = Date.now() + +req.body.expire * 24 * 60 * 60 * 1000;
    const response = await Coupon.findByIdAndUpdate(pcid, req.body, {
        new: true,
    });
    return res.json({
        success: response ? true : false,
        updatedCoupon: response ? response : 'Cannot update',
    });
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const response = await Coupon.findByIdAndDelete(cid);
    return res.json({
        success: response ? true : false,
        deletedCoupon: response ? response : 'Cannot delete',
    });
});

module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
};
