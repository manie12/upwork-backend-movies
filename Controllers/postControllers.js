import postModel from '../Models/postModel.js';

export const getPost = async (req, res) => {

    try {
        const Post = await postModel.find();
        res.status(201).json(Post);

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not post,sth went wrong" })
    }

}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const Post = await postModel.findById(id);
        res.status(201).json(Post);

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not post,sth went wrong" })
    }

}

export const postMessage = async (req, res) => {
    const { postMessage } = req.body;
    const newPost = new postModel({ postMessage, creator: req?.user?.email });
    try {
        const postedData = await newPost.save();

        res.status(201).json(postedData);

    } catch (error) {
        res.status(401).json({ message: "could not post,sth went wrong" })
    }

}


export const updatePost = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const post = req.body;

    try {
        const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true });

        res.status(201).json(updatedPost);

    } catch (error) {
        res.status(401).json({ message: "could not Update,sth went wrong" })
    }

}

export const deletePost = async (req, res) => {

    const { id } = req.params;

    try {
        await postModel.findByIdAndRemove(id);

        res.status(201).json("Post Deleted Successfully");

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not Delete,sth went wrong" })
    }

}

export const likePost = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await postModel.findById(id);
        const index = await post.likeCount.findIndex((email) => email === String(req?.user?.email));
        if (index === -1) {
            post.likeCount.push(req?.user?.email);
            res.status(201).json(` you have liked ${req?.user?.email} post `);

        } else {
            post.likeCount = post.likeCount.filter((email) => email !== req?.user?.email);
            res.status(201).json(` you have disliked ${req?.user?.email} post `);

        }
        const likedPost = await postModel.findByIdAndUpdate(id, post, { new: true });

        res.json(likedPost.length);
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not like,sth went wrong" })
    }

}


export const commentPost = async (req, res) => {

    const { id } = req?.params;
    const { comment } = req?.body;

    try {
        const post = await postModel.findById(id);
        post.comment.push(comment)
        const likedPost = await postModel.findByIdAndUpdate(id, post, { new: true });

        res.status(201).json(likedPost);
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not like,sth went wrong" })
    }

}

