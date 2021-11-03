import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//config
import { MONGODB } from './config.js';
import useRoutes from './Routes/userRoutes.js';
import postRoutes from './Routes/postRoutes.js';



const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", useRoutes);

app.use("/post", postRoutes);

const connect__url = MONGODB;

const PORT = process.env.PORT || 5000;


mongoose.connect(connect__url,).then((error) => {
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    };
});



app.listen(PORT, () => console.log(`server running on port ${PORT}`));