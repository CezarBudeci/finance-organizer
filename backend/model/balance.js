import mongoose from 'mongoose';

const balanceSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
});

balanceSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Balance = mongoose.model('Balance', balanceSchema);

export default Balance;
