import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import { invalidPathHandler, logger, errorHandler } from './libs/middlewares.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(logger);
app.use("/user", userRouter);

app.use("*", invalidPathHandler);

app.use(errorHandler);

mongoose
    .connect(MONGO_DB_URI)
    .then(()=> {
        console.log(`Connection with mongoDB: SUCCESS ✅`);
        app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
        })
    })
    .catch(error => {
        console.error(`Connection with mongoDB: FAILED ❌`, error);
        process.exit(1);
    })
mongoose.connection.on(`error`, () => {
    console.error(`Connection with mongoDB: FAILED ❌`), error;
})
