const {
  inputLimit: { packages, inputCharacterRate },
} = require('./config');

const inputLimit = (function () {
  const perPackageInputCharacterLimit = {};
  packages.forEach((_package, index) => {
    perPackageInputCharacterLimit[_package] = inputCharacterRate[index];
  });

  return perPackageInputCharacterLimit;
})();

module.exports = inputLimit;
