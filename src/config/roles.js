const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUser', 'getBookmarks', 'updateUserInfo', 'generateContent']);
roleRights.set(roles[1], ['getUser', 'getUsers', 'manageUsers', 'generateContent']);

module.exports = {
  roles,
  roleRights,
};
