import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },
});

categorySchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
