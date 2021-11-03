import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    postMessage: String,
    creator: String,
    id: String,
    likeCount: {
        type: [String],
        default: []
    },

    comment: {
        type: [String],
        default: []
    }

});

const userPost = mongoose.model('Post', userSchema);

export default userPost;
