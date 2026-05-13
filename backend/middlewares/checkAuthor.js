import { UserTypeModel } from '../models/UserModel.js';

export const checkAuthor = async (req, res, next) => {
  const aid = req.body?.author || req.params?.authorId;

  if (!aid) {
    return res.status(400).json({ message: 'Author ID is required' });
  }

  const author = await UserTypeModel.findById(aid);

  if (!author) {
    return res.status(401).json({ message: 'invalid author' });
  }

  if (author.role !== 'AUTHOR') {
    return res.status(403).json({ message: 'User is not an author' });
  }

  if (!author.isActive) {
    return res.status(403).json({ message: 'author account is not active' });
  }

  next();
};