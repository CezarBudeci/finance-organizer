import Category from '../model/category.js';

const getCategory = (id, name) => {
    let options = {};

    if (id) {
        options.id = id;
    }

    if (name) {
        options.name = name;
    }

    return Category.findOne(options);
};

const getCategories = names => {
    if (names) {
        return Category.find({ name: { $in: names } });
    } else {
        return Category.find();
    }
};

const addCategories = categories => {
    if (categories) {
        return Category.insertMany(categories);
    }
};

const deleteAllCategories = () => {
    return Category.deleteMany();
};

const CategoryService = {
    getCategory,
    getCategories,
    addCategories,
    deleteAllCategories,
};

export default CategoryService;
