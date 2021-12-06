import movieModel from '../Models/postModel.js';

export const getMovie = async (req, res) => {

    try {
        const Movie = await movieModel?.find().sort({ field: 'desc' });
        ;
        return res.status(201).json(Movie);

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not query,sth went wrong" })
    }

}

export const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const Movie = await movieModel.findById(id);
        return res.status(201).json(Movie);

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could get not movie,sth went wrong" })
    }

}

export const postMovie = async (req, res) => {
    const { movie, rating, duration } = req.body;
    const createdAt = movieModel?.createdAt;
    try {
        const defaultMovie = movieModel.find((mov) => mov === movie);

        if (defaultMovie === movie) {

            const dateUpdate = createdAt?.toISOString()
            let Movie = await movieModel.findByOneAndUpdate(movie, { movie, rating, duration, dateUpdate }, {
                new: true
            });

            return res.status(201).json(Movie);
        } else {
            const dateUpdate = createdAt?.toISOString()

            const newPost = new movieModel({ movie, rating, duration, dateUpdate });

            const Movie = await newPost.save();

            return res.status(201).json(Movie);

        }


    } catch (error) {
        res.status(401).json({ message: "could not post,sth went wrong" })
    }

}



export const deleteMovie = async (req, res) => {

    const { id } = req.params;

    try {
        await movieModel.findByIdAndRemove(id);

        res.status(201).json("Movie Deleted Successfully");

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "could not Delete,sth went wrong" })
    }

}


