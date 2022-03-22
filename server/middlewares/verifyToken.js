import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  const authHeader = authorization?.split(' ')[1];

  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRECT, (err, user) => {
      if (err) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: 'Token is not valid' });
      }

      req.user = user;
      next();
    });
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: getReasonPhrase(StatusCodes.FORBIDDEN) });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) next();
    else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You are not allowed to do this action' });
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You are not allowed to do this action' });
    }
  });
};
