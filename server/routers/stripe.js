import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRECT);

const router = Router();

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeError, stripeRes) => {
      if (stripeError) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: stripeError?.raw?.message || stripeError });
      } else {
        res.status(StatusCodes.OK).json(stripeRes);
      }
    },
  );
});

export default router;
