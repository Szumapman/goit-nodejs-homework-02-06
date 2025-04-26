const fs = require('fs').promises;
const path = require('path');
const { adjustAvatar } = require('../../../utils/avatars');
const { PUBLIC_AVATARS_PATH } = require('../../../constants/folders');

const moveAvatar = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const avatarTempFilePath = req.file.path;
    const adjustedAvatar = await adjustAvatar(avatarTempFilePath);
    if (!adjustedAvatar) {
        fs.unlink(avatarTempFilePath);
        return res.status(400).json({ message: 'File type not supported' });
    }

    const avatarFileName = req.file.filename;
    const avatarPath = path.join(PUBLIC_AVATARS_PATH, avatarFileName);
    try {
        await fs.rename(avatarTempFilePath, avatarPath);
        req.destination = PUBLIC_AVATARS_PATH;
        req.file.path = avatarPath;
        req.file.filename = avatarFileName;
        next();
    } catch (error) {
        fs.unlink(avatarTempFilePath);
        next(error);
    }
}

module.exports = moveAvatar;