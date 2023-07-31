const router = require('express').Router();
const ctrls = require('../controllers/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/create', [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.put('/like', [verifyAccessToken], ctrls.likeBlog);
router.put('/dislike', [verifyAccessToken], ctrls.dislikeBlog);
router.get('/', ctrls.getBlogs);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);

module.exports = router;
