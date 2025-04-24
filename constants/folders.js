const path = require('path');

const PUBLIC_DIR_NAME = 'public';
const AVATARS_DIR_NAME = 'avatars';
const TEMP_DIR_NAME = 'temp';

const PUBLIC_PATH = path.join(process.cwd(), PUBLIC_DIR_NAME);
const PUBLIC_AVATARS_PATH = path.join(process.cwd(), PUBLIC_DIR_NAME, AVATARS_DIR_NAME);
const TEMP_AVATARS_PATH = path.join(process.cwd(), TEMP_DIR_NAME, AVATARS_DIR_NAME);

module.exports = { PUBLIC_PATH, PUBLIC_AVATARS_PATH, TEMP_AVATARS_PATH, AVATARS_DIR_NAME };

