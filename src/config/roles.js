const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUser', 'updateUserInfo']);
roleRights.set(roles[1], ['getUser', 'getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
