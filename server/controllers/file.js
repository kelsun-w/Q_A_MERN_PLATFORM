const { upload } = require('../storage');

exports.handleUpload = name => (req, res, next) => {
    var uploadSingle = upload.single(name);

    uploadSingle(req, res, (err) => { // call as a normal function
        if (err) return res.status(415).send({ message: err.message })

        const file = req.file;
        if (!file) {
            return res.status(500).send({ message: "Please upload a file" });
        }
        next();
    });
}