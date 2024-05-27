const {
  inputLimit: { packages, inputCharacterRate },
} = require('./config');

/**
 * Immediately Invoked Function Expression (IIFE) to create a mapping of packages
 * to their respective input character limits. This ensures the mapping is created
 * once and is available whenever the module is imported.
 *
 * @returns {Object} A mapping of package names to their corresponding input character limits.
 */
const inputLimit = (function () {
  // Initialize an empty object to hold the package-to-character limit mapping
  const perPackageInputCharacterLimit = {};

  // Iterate over the packages array
  packages.forEach((_package, index) => {
    // For each package, set the character limit from the inputCharacterRate array
    perPackageInputCharacterLimit[_package] = inputCharacterRate[index];
  });

  // Return the constructed mapping object
  return perPackageInputCharacterLimit;
})();

module.exports = inputLimit;
