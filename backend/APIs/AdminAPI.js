import exp from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { UserTypeModel } from '../models/UserModel.js';

export const adminRoute = exp.Router();

adminRoute.delete('/users/:userid', verifyToken('ADMIN'), async (req, res) => {
  const { userid } = req.params;

  const user = await UserTypeModel.findByIdAndUpdate(
    userid,
    { $set: { isActive: false } },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.status(200).json({ message: 'user blocked', payload: user });
});

adminRoute.patch('/users/:userid/unblock', verifyToken('ADMIN'), async (req, res) => {
  const { userid } = req.params;

  const user = await UserTypeModel.findByIdAndUpdate(
    userid,
    { $set: { isActive: true } },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.status(200).json({ message: 'user unblocked', payload: user });
});