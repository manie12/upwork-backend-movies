import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    movie: String,
    rating: String,
    duration: String,
    id: String,


});

const moviePost = mongoose.model('Post', movieSchema);

export default moviePost;
