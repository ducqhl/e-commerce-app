import cryptoJs from 'crypto-js';
import { Router } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken.js';
import User from '../models/User.js';

const router = Router();

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' });

  if (req.body.password) {
    req.body.password = cryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRECT_PASSPHRASE,
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );

    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// Delete user
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' });

  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
});

// Get user
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' });

  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(StatusCodes.OK).json({ ...others });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
});

// Get users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const rawUsers = query
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find();
    const users = rawUsers.map((u) => {
      const { password, ...others } = u._doc;
      return { ...others };
    });

    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
});

// Get users stat
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
});

export default router;
