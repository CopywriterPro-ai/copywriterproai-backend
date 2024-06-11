const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getUserInfo',
  'updateUserInfo',
  'generateContent',
  'checkPlagiarism',
  'generateContentExtension',
  'manageContent',
  'getBlog',
  'manageBlog',
]);
roleRights.set(roles[1], [
  'getUserInfo',
  'updateUserInfo',
  'getUsers',
  'manageUsers',
  'generateContent',
  'checkPlagiarism',
  'generateContentExtension',
  'manageTools',
  'manageContent',
  'getBlog',
  'manageBlog',
  'updateNotice',
]);

module.exports = {
  roles,
  roleRights,
};
