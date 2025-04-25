const { AVATARS_DIR_NAME } = require('../../../constants/folders');
const { setUserField } = require('../../../repositories/users');
const { deleteOldAvatar } = require('../../../utils/avatars');

const setAvatar = async (req, res, next) => {
    const userId = req.user._id;
    const oldAvatarURL = req.user.avatarURL;
    const avatarFileName = req.file.filename;
    if (!avatarFileName) {
        return res.status(400).json({ message: 'Something went wrong - no file uploaded. Please try again' });
    }
    const user = await setUserField(userId, 'avatarURL', `/${AVATARS_DIR_NAME}/${avatarFileName}`);
    if (oldAvatarURL) await deleteOldAvatar(oldAvatarURL);
    return res.status(200).json({ message: 'Avatar set', user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL } });
}

module.exports = setAvatar;

