const router = require('express').Router();
const ctrls = require('../controllers/order');
const uploader = require('../config/cloudinary.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createNewOrder);

module.exports = router;
