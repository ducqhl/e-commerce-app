import { Router } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import {
  verifyToken,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken.js';
import Cart from '../models/Cart.js';

const router = Router();

// CREATE

router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(StatusCodes.OK).json(savedCart);
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
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );

    res.status(StatusCodes.OK).json(updatedCart);
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
    await Cart.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.OK).json({ message: `${req.params.id} deleted` });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// GET USER CART

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// GET ALL

router.get('/', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(StatusCodes.OK).json(carts);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

export default router;
