const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUserInfo', 'updateUserInfo', 'generateContent', 'manageContent', 'getBlog', 'manageBlog']);
roleRights.set(roles[1], [
  'getUserInfo',
  'updateUserInfo',
  'getUsers',
  'manageUsers',
  'generateContent',
  'manageTools',
  'manageContent',
  'getBlog',
  'manageBlog',
]);

module.exports = {
  roles,
  roleRights,
};
