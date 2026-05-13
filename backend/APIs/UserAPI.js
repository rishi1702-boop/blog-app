import exp from 'express';
import { register } from '../services/authServices.js';
import { articleTypeModel } from '../models/ArticleModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../config/multer.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
import cloudinary from '../config/cloudinary.js';

export const userRoute = exp.Router();
userRoute.post(
  "/users",
  upload.single("profileImageUrl"),
  async (req, res, next) => {
    let cloudinaryResult;

    try {
      // Parse user object from form-data if it's sent as a stringified JSON
      let userObj = req.body;
      if (typeof req.body.userObj === 'string') {
        userObj = JSON.parse(req.body.userObj);
      } else if (typeof req.body.user === 'string') {
        userObj = JSON.parse(req.body.user);
      }

      //  Step 1: upload image to cloudinary from memoryStorage (if exists)
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      // Step 2: call existing register()
      const newUserObj = await register({
        ...userObj,
        role: "USER",
        profileImageUrl: cloudinaryResult?.secure_url || userObj.profileImageUrl || "",
      });

      res.status(201).json({
        message: "user created",
        payload: newUserObj,
      });

    } catch (err) {

      // Step 3: rollback 
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }

      next(err); // send to your error middleware
    }

  }
);


userRoute.get('/articles', verifyToken('USER', 'AUTHOR', 'ADMIN'), async (req, res) => {
  try {
    const articles = await articleTypeModel.find({ isArticleActive: true }).populate('author', 'firstName lastName username');

    res.status(200).json({ message: 'fetched all articles', payload: articles });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching articles', error: err.message });
  }
});

// GET single article by ID
userRoute.get('/articles/:articleid', verifyToken('USER', 'AUTHOR', 'ADMIN'), async (req, res) => {
  try {
    const article = await articleTypeModel.findById(req.params.articleid)
      .populate('author', 'firstName lastName username')
      .populate('comments.user', 'firstName lastName username');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article fetched', payload: article });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching article', error: err.message });
  }
});

userRoute.post('/articles/:articleid/comment', verifyToken('USER'), async (req, res) => {
  const { comment } = req.body;
  const { articleid } = req.params;

  try {
    const updatedArticle = await articleTypeModel.findByIdAndUpdate(
      articleid,
      { $push: { comments: { user: req.user.userId, comment } } },
      { new: true }
    ).populate('comments.user', 'firstName lastName username');

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Comment added', payload: updatedArticle });
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
});

// DELETE comment
userRoute.delete('/articles/:articleid/comments/:commentid', verifyToken('USER', 'AUTHOR'), async (req, res) => {
  const { articleid, commentid } = req.params;

  try {
    const article = await articleTypeModel.findById(articleid);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const comment = article.comments.id(commentid);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Authorization: commenter or article author
    const isCommenter = comment.user.toString() === req.user.userId;
    const isAuthor = article.author.toString() === req.user.userId;

    if (!isCommenter && !isAuthor) {
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });
    }

    // article.comments.pull(commentid); // Mongoose 6+ way
    // or
    comment.deleteOne();
    await article.save();

    res.status(200).json({ message: 'Comment deleted', payload: article });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
});