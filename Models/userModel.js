import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userNama: String,
    email: String,
    password: String,
    confirmPassword: String

});

const userPost = mongoose.model('User', userSchema);

export default userPost;
