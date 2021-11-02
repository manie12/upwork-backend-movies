import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    postMessage: String,
    creator: String,
    id: String,


});

const userPost = mongoose.model('Post', userSchema);

export default userPost;
