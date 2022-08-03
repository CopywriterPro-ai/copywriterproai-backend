const getLimits = (validationData, inputLimit) => {
  const data = JSON.parse(JSON.stringify(validationData)); // deep copy
  Object.keys(data).forEach((key) => {
    if (data[key].variable && data[key].max) {
      data[key].max *= inputLimit;
    }
  });

  return data;
};

module.exports = getLimits;
