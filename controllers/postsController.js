const asyncHandler = require("express-async-handler")
const { Post,validateCreatePost ,validateUpdatePost } = require("../models/posts")


/**-------------------------------------------
 * @route POST /api/posts
 * @description Create a new post
 * @method POST
 * @access Public
--------------------------------------------*/

 
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
    const { error } = validateCreatePost(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    // Save the post to the database
    await post.save();

    res.status(201).json(post);
});
/**-------------------------------------------
 * @route GET /api/posts
 * @description get posts
 * @method GET
 * @access Public
--------------------------------------------*/


module.exports.getPostsCtrl = asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
  });

  /**-------------------------------------------
 * @route PUT /api/posts
 * @description update a post by ID
 * @method PUT
 * @access Public
--------------------------------------------*/
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUpdatePost(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const postId = req.params.id;
  
    // Check if the post exists
    const post = await Post.findById(postId);
  
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  
    // Update the post
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
  
    // Save the updated post
    await post.save();
  
    res.status(200).json(post);
  });

 /**-------------------------------------------
 * @route Delete /api/posts
 * @description delete a post by ID
 * @method DELETE
 * @access Public
--------------------------------------------*/

module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  try {
    // Check if the post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post
    await post.remove();

    res.status(204).end(); // Respond with no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
