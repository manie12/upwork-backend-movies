import jwt from 'jsonwebtoken';

export const Auth = async (req, res, next) => {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        if (token) {
            const decodedToken = jwt.verify(token, "test");
            req.userId = decodedToken?.email;

        } else {
            res.status(401).json("Not Authenticated")
        }
        next()
    } catch (error) {
        res.status(502).json("Something went wrong")
    }
}
