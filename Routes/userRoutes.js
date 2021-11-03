import express from 'express';
import { user_login, user_post, getUser, getUserById, followPost } from '../Controllers/userController.js';

//authentication
import { Auth } from '../Middlewares/AuthMiddleWare.js';


const router = express.Router();


router.post('/signup', user_post);
router.post('/login', user_login);
router.get('/', getUser);
router.get('/:id', Auth, getUserById);
router.patch('/:id/follow', Auth, followPost);



export default router;