const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUserInfo', 'updateUserInfo', 'generateContent']);
roleRights.set(roles[1], ['getUserInfo', 'getUsers', 'manageUsers', 'generateContent', 'manageTools']);

module.exports = {
  roles,
  roleRights,
};
