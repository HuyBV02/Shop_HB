const router = require('express').Router();
const userControllers = require('../controllers/user');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/current', verifyAccessToken, userControllers.getCurrent);
router.put('/refreshtoken', userControllers.refreshAccessToken);
router.get('/logout', userControllers.logOut);
router.get('/forgotpassword', userControllers.forgotPassword);
router.put('/resetpassword', userControllers.resetPassword);

module.exports = router;
