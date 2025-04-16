const users = require('../services/schemas/users');

const getUser = async (filter) => {
    return await users.findOne(filter);
};

module.exports = { getUser };