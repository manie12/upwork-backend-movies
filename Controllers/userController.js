import userSchema from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const user_post = async (req, res) => {
    const { email, username, confirmPassword, password } = req.body;

    try {
        const existingEmail = await userSchema.findOne({ email });

        if (existingEmail) return res.status(400).json({ message: 'user already exist' });

        if (password !== confirmPassword) return res.status(400).json({ message: 'password does not match' });

        const hashedpassword = await bcrypt.hash(password, 12);

        const result = await new userSchema({ email, username, password: hashedpassword, });

        await result.save();

        const token = await jwt.sign({ id: result._id, email: result.email }, "test", { expiresIn: "1hr" });

        return res.status(200).json({ result, token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "something went wrong" })
    }

}

export const user_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userSchema.findOne({ email });
        if (!existingUser) return res.status(400).json({ message: "user does not exist" });

        const correctPassword = await bcrypt.compare(password, existingUser.password);

        if (!correctPassword) return res.status(400).json({ message: 'wrong password' });

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, 'test', { expiresIn: '1hr' })

        return res.status(200).json({ result: existingUser, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "something went wrong" })
    }

}

export const getUser = async (req, res) => {

    try {
        const User = await userSchema.find();
        res.status(201).json(User);

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not post,sth went wrong" })
    }

}
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const User = await userSchema.findById(id);
        res.status(201).json(User);

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not post,sth went wrong" })
    }
}

export const followPost = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await userSchema.findById(id);
        const index = await post.follow.findIndex((email) => email === req?.user?.email);
        if (index === -1) {
            post.follow.push(req?.user?.email);
            res.status(201).json(` you are  following ${req?.user?.email}  `);

        } else {
            post.follow = post.follow.filter((email) => email !== req?.user?.email);
            res.status(201).json(` you have unfollowed ${req?.user?.email}  `);

        }
        const followedPost = await userSchema.findByIdAndUpdate(id, post, { new: true });

        res.json(followedPost);
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not like,sth went wrong" })
    }

}