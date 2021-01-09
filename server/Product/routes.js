// Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().
const router = require("express").Router();
const multerInstance = require('../config-server/multer')
const itemController = require("./controller");


router.post("/", multerInstance.upload.single('image'), itemController.createItem);
router.get("/", itemController.getItems);
router.get("/:id", itemController.getItemById);
router.delete("/:id", itemController.removeItem);
module.exports = router;