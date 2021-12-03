import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
//config

import postRoutes from './Routes/postRoutes.js';



const app = express();

dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/movie", postRoutes);


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB,).then((error) => {
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    };
});



app.listen(PORT, () => console.log(`server running on port ${PORT}`));