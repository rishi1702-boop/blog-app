import exp from 'express';
import { register } from '../services/authServices.js';
import { UserTypeModel } from '../models/UserModel.js';
import { articleTypeModel } from '../models/ArticleModel.js';
import { checkAuthor } from '../middlewares/checkAuthor.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../config/multer.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
import cloudinary from '../config/cloudinary.js';

export const authorRoute = exp.Router();

authorRoute.post(
  '/users',
  upload.single("profileImageUrl"),
  async (req, res, next) => {
    let cloudinaryResult;

    try {
      let userObj = req.body;
      if (typeof req.body.userObj === 'string') {
        userObj = JSON.parse(req.body.userObj);
      } else if (typeof req.body.user === 'string') {
        userObj = JSON.parse(req.body.user);
      }

      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      const newUserObj = await register({ 
        ...userObj, 
        role: 'AUTHOR',
        profileImageUrl: cloudinaryResult?.secure_url || userObj.profileImageUrl || ""
      });

      res.status(201).json({ message: 'author created', payload: newUserObj });
    } catch (err) {
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }
      next(err);
    }
  }
);

authorRoute.post('/articles', verifyToken('AUTHOR'), async (req, res) => {
  const articleObj = req.body;

  const author = await UserTypeModel.findById(articleObj.author);

  if (!author || author.role !== 'AUTHOR') {
    return res.status(401).json({ message: 'invalid author' });
  }

  const articleDoc = new articleTypeModel(articleObj);

  const createdArticle = await articleDoc.save();

  res.status(201).json({ message: 'article created', payload: createdArticle });
});

authorRoute.get('/articles/:authorId', verifyToken('AUTHOR'), checkAuthor, async (req, res) => {
  const aid = req.params.authorId;

  const articlesDoc = await articleTypeModel
    .find({ author: aid })
    .populate('author', 'firstName email');

  res.status(200).json({ message: 'Fetched articles', allArticles: articlesDoc });
});

authorRoute.put('/articles/:articleid', verifyToken('AUTHOR'), async (req, res) => {
  const objId = req.params.articleid;

  const updatedArticle = await articleTypeModel.findByIdAndUpdate(
    objId,
    { $set: { ...req.body } },
    { new: true }
  );

  if (!updatedArticle) {
    return res.status(404).json({ message: 'article not found' });
  }

  res.status(200).json({ message: 'modified article', payload: updatedArticle });
});

authorRoute.patch('/articles/:articleid', verifyToken('AUTHOR'), async (req, res) => {
  const article = await articleTypeModel.findById(req.params.articleid);

  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }

  article.isArticleActive = !article.isArticleActive;

  await article.save();

  res.status(200).json({
    message: `Article ${article.isArticleActive ? 'activated' : 'deactivated'}`,
    payload: article,
  });
});