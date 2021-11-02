import postModel from '../Models/postModel.js';

export const getPost = async (res, req) => {

    try {
        const Post = new postModel.find();

        res.status(201).json(Post);

    } catch (error) {
        res.status(401).json({ message: "could not post,sth went wrong" })
    }

}
export const postMessage = async (res, req) => {
    const post = req.body;

    const newPost = new postModel(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        res.status(401).json({ message: "could not post,sth went wrong" })
    }

}


export const updatePost = async (res, req) => {
    const { id } = req.body;
    const post = req.body;


    try {
        const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true });

        res.status(201).json(updatedPost);

    } catch (error) {
        res.status(401).json({ message: "could not Update,sth went wrong" })
    }

}

export const deletePost = async (res, req) => {

    const { id } = req.body;


    try {
        await postModel.findByIdAndDelete(id);

        res.status(201).json("Post Deleted Successfully");

    } catch (error) {
        res.status(401).json({ message: "could not Delete,sth went wrong" })
    }

}
