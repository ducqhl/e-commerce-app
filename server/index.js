import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import './__setting.js';
import authRoute from './routers/auth.js';
import cartRoute from './routers/cart.js';
import orderRoute from './routers/order.js';
import productRoute from './routers/product.js';
import stripeRoute from './routers/stripe.js';
import userRoute from './routers/user.js';

mongoose
  .connect(process.env.MONGODB_CONNECTION_URI)
  .then(() => console.log('DB connect successfully'))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      JSON.stringify(req.body),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  }),
);

const crossOrigins =
  process.env.CROSS_ORIGINS === '*'
    ? process.env.CROSS_ORIGINS
    : process.env.CROSS_ORIGINS?.split(',');
console.log(crossOrigins);
app.use(cors({ origin: crossOrigins }));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/checkout', stripeRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on ${port}`));
