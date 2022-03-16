import { Router } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import { verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import Product from '../models/Product.js';

const router = Router();

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(StatusCodes.OK).json(savedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error?.message ?? error });
  }
});

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' });

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ message: 'Delete successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

// GET PRODUCT

router.get('/find/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' });

  try {
    const product = await Product.findById(req.params.id);
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

//GET ALL PRODUCTS

router.get('/', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

export default router;
