const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');

const { TEMP_AVATARS_PATH } = require('../../../constants/folders');
const { IMAGE_EXTENSIONS, IMAGE_MIMETYPES } = require('../../../constants/images');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_AVATARS_PATH);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `user-avatar-${nanoid()}-${ext}`);
    }
});

const uploadAvatar = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const mimeType = file.mimetype;
        if (IMAGE_EXTENSIONS.includes(ext) && IMAGE_MIMETYPES.includes(mimeType)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 3 }
});


module.exports = uploadAvatar;