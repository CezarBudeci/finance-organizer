import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        minLength: 3,
    },
    description: {
        type: String,
        minLength: 5,
    },
    date: {
        type: Date,
        required: true,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        retuired: true,
    },
});

expenseSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
