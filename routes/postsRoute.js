const router = require("express").Router()
const { createPostCtrl ,getPostsCtrl ,updatePostCtrl, deletePostCtrl} = require('../controllers/postsController');

/**
 * @route POST /api/posts
 * @description Create a new post
 * @method POST
 * @access Public
 */
router.route("/").post(createPostCtrl);
/**
 * @route GET /api/posts
 * @description get posts
 * @method GET
 * @access Public
 */
router.get("/", getPostsCtrl);

/**
 * @route PUT /api/posts
 * @description update a post by ID
 * @method PUT
 * @access Public
 */
router.put("/:id", updatePostCtrl);

/**
 * @route DELETE /api/posts/:id
 * @description Delete a post by ID
 * @method DELETE
 * @access Public
 */
router.delete("/:id", deletePostCtrl);

module.exports = router;

