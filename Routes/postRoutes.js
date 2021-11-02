import express from 'express';
import { getPost, postMessage, updatePost, deletePost } from '../Controllers/postControllers.js';

//authentication
import { Auth } from '../Middlewares/AuthMiddleWare.js';

const router = express.Router();


router.post('/', getPost);
router.post('/', Auth, postMessage);
router.patch('/:id', Auth, updatePost);
router.delete('/:id', Auth, deletePost);



export default router;