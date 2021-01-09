const multer = require("multer");
const path = require("path");

//image upload
const storage = multer.diskStorage({
    //destination is used to determine within which folder the uploaded files should be stored
    destination: (req, res, cb) => {
        cb(null, path.join("./uploads/"));
    },
    //filename is used to determine what the file should be named inside the folder
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.', 400), false);
    }
};

exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});