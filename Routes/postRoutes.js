import express from 'express';
import { getMovie, getMovieById, postMovie, deleteMovie } from '../Controllers/postControllers.js';

//authentication

const router = express.Router();


router.get('/', getMovie);
router.post('/', postMovie);
router.delete('/:id', deleteMovie);
router.get('/:id', getMovieById);



export default router;