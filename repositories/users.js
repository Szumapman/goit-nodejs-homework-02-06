const users = require('../services/schemas/users');

const getUser = async (filter) => {
    return await users.findOne(filter);
};

const setUserField = async (userId, field, value) => {
    return await users.findOneAndUpdate({ _id: userId }, { [field]: value }, { new: true, valdateBeforeSave: true, runValidators: true, context: 'query' });
};

module.exports = { getUser, setUserField };