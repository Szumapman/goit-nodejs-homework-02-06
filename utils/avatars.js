const gravatar = require('gravatar');
const { Jimp } = require('jimp');
const fs = require('fs').promises;
const path = require('path');
const { AVATAR_SIZE } = require('../constants/avatars');
const { AVATARS_DIR_NAME, PUBLIC_PATH } = require('../constants/folders');


const createDefaultAvatar = (email) => gravatar.url(email, { s: `${AVATAR_SIZE}`, r: 'g', d: 'robohash' }, true);

const adjustAvatar = async (path) => {
    try {
        const image = await Jimp.read(path);
        await image.rotate(360).resize({ w: AVATAR_SIZE, h: AVATAR_SIZE }).write(path);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const deleteOldAvatar = async (oldAvatarURL) => {
    try {
        await fs.unlink(path.join(PUBLIC_PATH, oldAvatarURL));
    } catch (error) {
        console.log(error);
    }
};


module.exports = { createDefaultAvatar, adjustAvatar, deleteOldAvatar };