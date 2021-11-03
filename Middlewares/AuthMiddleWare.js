import jwt from 'jsonwebtoken';

export const Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            jwt.verify(token, "test", (err, user) => {
                console.log(err)

                if (err) return res.status(403).json("403")
                req.user = user;
                next();

            });
            // req.userEmail = decodedToken?.email;

        } else {
            res.status(401).json("Not Authenticated")
        }
    } catch (error) {
        console.log(error)
        res.status(502).json("Something went wrong")
    }
}
