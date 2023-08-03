const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req, res) => {
    const response = await Brand.create(req.body);
    return res.json({
        success: response ? true : false,
        createdBrand: response ? response : 'Cannot create',
    });
});

const getBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find().select('title _id');
    return res.json({
        success: response ? true : false,
        prodBrands: response ? response : 'Cannot get',
    });
});

const updateBrand = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await Brand.findByIdAndUpdate(pcid, req.body, {
        new: true,
    });
    return res.json({
        success: response ? true : false,
        updatedBrand: response ? response : 'Cannot update',
    });
});

const deleteBrand = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await Brand.findByIdAndDelete(pcid);
    return res.json({
        success: response ? true : false,
        deletedBrand: response ? response : 'Cannot delete',
    });
});

module.exports = {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand,
};
