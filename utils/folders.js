const fs = require('fs').promises;

const isAccessible = async (path) => {
    try {
        await fs.access(path);
        return true;
    } catch (error) {
        return false;
    }
};

const setupFolder = async (path) => {
    if (!await isAccessible(path)) {
        try {
            await fs.mkdir(path, { recursive: true });
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
};

module.exports = { setupFolder };
        