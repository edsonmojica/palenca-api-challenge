import { Router, Request, Response } from 'express';
import { getProfile, getRoot, postLogin } from '../controllers/controllers';

const router = Router();

router.get('/', getRoot);
router.post('/uber/login', postLogin);
router.get('/uber/profile/:access_token', getProfile);

export default router;
