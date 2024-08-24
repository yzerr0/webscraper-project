const dummy = require("./dummy.json");

function getUserById(id, callback) {
    try {
        user = dummy.users.find(user => user.id === id);
        callback(null, user);
    } catch (error) {
        callback(new Error("User not found"));
    }
}

function createUser(user) {
    return new Promise((resolve, reject) => {
        const newUser = { id: dummy.users.length + 1, ...user }
        dummy.users.push(newUser);
        resolve(newUser);
    });
}

module.exports = {
    getUserById,
    createUser
}