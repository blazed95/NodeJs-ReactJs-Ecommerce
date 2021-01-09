const Item = require("./itemScema");

exports.items = async () => {
    const items = await Item.find();
    return items;
};
exports.itemById = async (id) => {
    const item = await Item.findById(id);
    return item;
}
exports.createItem = async (payload) => {
    const newItem = await Item.create(payload);
    return newItem;
}

exports.removeItem = async (id) => {
    const item = await Item.findByIdAndRemove(id);
    return item;
}