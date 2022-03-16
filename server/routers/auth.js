import cryptoJS from 'crypto-js';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getReasonPhrase } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';

import User from '../models/User.js';

const router = Router();

//Register
router.post('/register', async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  }

  const newUser = new User({
    username,
    email,
    password: cryptoJS.AES.encrypt(
      password,
      process.env.SECRECT_PASSPHRASE,
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(StatusCodes.CREATED).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
});

//Login
router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: getReasonPhrase(StatusCodes.FORBIDDEN),
      });
    }

    const hashedPassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.SECRECT_PASSPHRASE,
    );
    const originPass = hashedPassword.toString(cryptoJS.enc.Utf8);

    if (password === originPass) {
      const accessToken = jsonwebtoken.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRECT,
        {
          expiresIn: '3d',
        },
      );

      const { password, ...others } = user._doc;

      return res.status(StatusCodes.ACCEPTED).json({ ...others, accessToken });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
});

export default router;
