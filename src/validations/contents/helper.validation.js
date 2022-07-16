const getLimits = (data, inputLimit) => {
  Object.keys(data).forEach((key) => {
    if (data[key].variable && data[key].max) {
      data[key].max *= inputLimit;
    }
  });
  return data;
};

module.exports = getLimits;
