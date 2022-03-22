import { Router } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken.js';
import Order from '../models/Order.js';

const router = Router();

// CREATE

router.post('/', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(StatusCodes.OK).json(savedOrder);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// UPDATE

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid Id' });

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );

    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// DELETE

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid Id' });

  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.OK).json({ message: `${req.params.id} deleted` });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// GET USER ORDERS

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId });
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// GET ALL

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// GET MONTHLY INCOME

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const fromMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const productId = req.query.pid;

  if (!mongoose.isValidObjectId(productId))
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid Product Id' });

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: fromMonth,
          },
          ...(productId && {
            products: {
              $elemMatch: {
                productId,
              },
            },
          }),
        },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);

    res.status(StatusCodes.OK).json(income);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

export default router;
