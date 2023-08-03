const router = require('express').Router();
const ctrls = require('../controllers/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/', ctrls.getBlogs);
router.get('/one/:bid', ctrls.getBlog);
router.post('/create', [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.put('/like/:bid', [verifyAccessToken], ctrls.likeBlog);
router.put('/dislike/:bid', [verifyAccessToken], ctrls.dislikeBlog);
router.put('/update/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete('/delete/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
