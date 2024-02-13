import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        required: true,
    },
    description: {
        type: String,
        minLength: 5,
    },
    currency: {
        type: String,
        minLength: 3,
        maxLength: 3,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense',
        },
    ],
});

profileSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
