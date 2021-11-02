import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import useRoutes from './Routes/useRoutes.js';

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(useRoutes);

const connect__url = "mongodb+srv://simplify12:simplify12@cluster0.rtplg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;


mongoose.connect(connect__url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then((error) => {
    console.log(error)
});



app.listen(PORT, () => console.log(`server running on port ${PORT}`));