export const validateName = (input) => {
  const urlRegex = /^[a-z0-9\-]+$/;
  return urlRegex.test(input) || "Please enter a valid URL.";
};

export const validateVersion = (input) => {
  const semverRegex = /^(\d+\.)?(\d+\.)?(\*|\d+)$/;
  return semverRegex.test(input)
    ? true
    : "Please enter a valid SemVer version. (e.g., 1.0.0)";
};

export const validateDescription = (input) => {
  return (
    (typeof input === "string" && input.trim() !== "") ||
    "Please enter a valid description."
  );
};

export const validateLicense = (input) => {
  const validLicenses = [
    "MIT",
    "GPL-3.0",
    "GPL-2.0",
    "Apache-2.0",
    "BSD-3-Clause",
    "BSD-2-Clause",
    "ISC",
    "Creative Commons Zero (CC0)",
    "Creative Commons Attribution 4.0 (CC BY 4.0)",
    "Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)",
    "Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)",
    "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)",
    "Eclipse Public License 2.0",
    "Mozilla Public License 2.0",
    "Artistic License 2.0",
    "Common Development and Distribution License (CDDL)",
    "GNU Lesser General Public License v3.0 (LGPL-3.0)",
    "GNU Lesser General Public License v2.1 (LGPL-2.1)",
    "Public Domain",
    "AGPL-3.0",
    "Zlib",
    "Unlicense",
    "NetBSD",
    "Microsoft Public License (Ms-PL)",
    "Microsoft Reciprocal License (Ms-RL)",
    "OFL",
    "NPL 1.1",
    "WTFPL",
    "JSON License",
    "SGI Free Software License B",
    "PostgreSQL License",
    "Open Software License 3.0",
    "Simplified BSD License",
    "Free Software Foundation License",
    "Apache 1.0",
    "Apache 1.1",
    "Apache 2.0",
    "European Union Public License 1.1",
    "Python Software Foundation License",
    "SIL Open Font License 1.1",
    "Clarus License",
    "Q Public License 1.0",
    "Open Database License (ODbL)",
    "EUPL",
    "Creative Commons Attribution-NoDerivs 4.0 (CC BY-ND 4.0)",
    "Creative Commons Attribution-NonCommercial-NoDerivs 4.0 (CC BY-NC-ND 4.0)",
    "CC BY 2.5",
    "CC BY 3.0",
    "CC BY 4.0",
    "CC BY-SA 2.5",
    "CC BY-SA 3.0",
    "CC BY-SA 4.0",
  ];

  return validLicenses.includes(input) || "Please enter a valid license.";
};

export const validateUrl = (input) => {
  const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)|(git@.*\.git)$/;
  return urlRegex.test(input) || "Please enter a valid URL.";
};
