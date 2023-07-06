export const GetConvertionToInsensitive = params => {
  const nonCasesSensistiveParams = [];
  for (const [name, value] of params) {
    const nameConverted = name.toLowerCase();
    nonCasesSensistiveParams[nameConverted] = value;
  }

  return nonCasesSensistiveParams;
};
