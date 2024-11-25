import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

export default model('User', userSchema);