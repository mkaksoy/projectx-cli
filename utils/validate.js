export const validateSemVer = (input) => {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(input)
    ? true
    : "Please enter a valid SemVer version. (e.g., 1.0.0)";
};

export const validateUrl = (input) => {
  const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)|(git@.*\.git)$/;
  return urlRegex.test(input) || "Please enter a valid URL.";
};