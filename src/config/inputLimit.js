const { inputLimit: { packages, inputCharacterRate } } = require('./config');

const inputLimit = (function () {
  const perPackageInputCharacterLimit = {};
  packages.forEach((pkg, index) => {
    perPackageInputCharacterLimit[pkg] = inputCharacterRate[index];
  });
  return perPackageInputCharacterLimit;
})();

console.log(inputLimit); // Add this line to log the mapping and verify it

module.exports = inputLimit;
