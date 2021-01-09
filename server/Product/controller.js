const itemRepository = require('./repository')
exports.createItem = async (req, res) => {
    try {
        let payload = {
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            image: req.file.path,
            category: req.body.category

        }
        let item = await itemRepository.createItem({
            ...payload
        });
        res.status(200).json({
            status: true,
            data: item,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getItems = async (req, res) => {
    try {
        let items = await itemRepository.items();
        res.status(200).json({
            status: true,
            data: items,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getItemById = async (req, res) => {
    try {
        let id = req.params.id
        let itemtDetails = await itemRepository.itemById(id);
        res.status(200).json({
            status: true,
            data: itemtDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeItem = async (req, res) => {
    try {
        let id = req.params.id
        let itemDetails = await itemRepository.removeItem(id)
        res.status(200).json({
            status: true,
            data: itemDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}