const getLimits = (validationData, inputLimit) => {
  console.log('Original validation data:', validationData);
  console.log('Input limit:', inputLimit);

  const data = JSON.parse(JSON.stringify(validationData)); // deep copy
  Object.keys(data).forEach((key) => {
    if (data[key].variable && data[key].max) {
      data[key].max *= inputLimit; // Ensure correct multiplication
    }
  });

  console.log('Processed data:', data); // Log the processed data

  return data;
};

module.exports = getLimits;
