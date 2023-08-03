const router = require('express').Router();
const ctrls = require('../controllers/blog');
const uploader = require('../config/cloudinary.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/', ctrls.getBlogs);
router.get('/one/:bid', ctrls.getBlog);
router.put(
    '/image/:bid',
    [verifyAccessToken, isAdmin],
    // uploader.array('images', 10),
    uploader.single('images'),
    ctrls.uploadImagesBlog,
);
router.post('/create', [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.put('/like/:bid', [verifyAccessToken], ctrls.likeBlog);
router.put('/dislike/:bid', [verifyAccessToken], ctrls.dislikeBlog);
router.put('/update/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete('/delete/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
