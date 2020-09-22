const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/' + file.fieldname);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = '.' + file.mimetype.substring(file.mimetype.indexOf('/') + 1);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
})

const fileSizeLimit = 1024 * 1024 * 8; // 8 mb

const fileFilter = (req, file, cb) => {
    // accept only jpeg | png images
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid image type. Only jpeg and png allowed. Instead found ' + file.mimetype), false);
    }
};

exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: fileSizeLimit
    },
    fileFilter: fileFilter
});
