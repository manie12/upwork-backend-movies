import express from 'express';
import { user_login, user_post } from '../Controllers/userController.js';

//authentication


const router = express.Router();


router.post('/signup', user_post);
router.post('/login', user_login);



export default router;