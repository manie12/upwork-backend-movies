import express from 'express';
import { getPost, postMessage, updatePost, deletePost, likePost, commentPost, } from '../Controllers/postControllers.js';

//authentication
import { Auth } from '../Middlewares/AuthMiddleWare.js';

const router = express.Router();


router.get('/', getPost);
router.post('/', Auth, postMessage);
router.patch('/:id', Auth, updatePost);
router.delete('/:id', Auth, deletePost);
router.patch('/:id/likes', Auth, likePost);
router.post('/:id/comments', Auth, commentPost);



export default router;