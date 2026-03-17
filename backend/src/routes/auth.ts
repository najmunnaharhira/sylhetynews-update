import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    // ...existing login logic...
    res.json({ status: 'ok' });
  }
);

export default router;
