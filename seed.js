import "dotenv/config";
import mongoose from 'mongoose';

import User from './models/userModel.js';

const MONGO_DB_URI = process.env.MONGO_DB_URI;

mongoose
    .connect(MONGO_DB_URI)
    .then(()=> {
        console.log(`Connection with mongoDB: SUCCESS ✅`);
        const users = [
            {
                username: "User1",
                email: "user1@user.de",
            },
            {
                username: "User2",
                email: "user2@user.de",
            },
        ];

        User.insertMany(users)
            .then(() => {
                console.log(`Users created successfully`);
                mongoose.disconnect();
            })
            .catch(error => {
                console.error(`Error while creating users`, error);
                mongoose.disconnect();
            })
    })
    .catch(error => {
        console.error(`Connection with mongoDB: FAILED ❌`, error);
    })