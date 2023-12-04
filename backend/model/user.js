import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

userSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const User = mongoose.model('User', userSchema);

export default User;
