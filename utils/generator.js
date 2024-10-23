import fs from "fs";
import gitignore from "../templates/gitignore.js";

const gen = async (dataToWrite) => {
  const isGit = () => {
    if (dataToWrite.git) {
      return {
        repository: {
          type: "git",
          url:
            dataToWrite.gitProtocol === "ssh"
              ? `git+ssh://${dataToWrite.gitUrl}`
              : dataToWrite.gitUrl,
        },
      };
    }
    return null;
  };

  const createPackageJson = () => {
    const scripts = {};
    dataToWrite.scripts.forEach((script) => {
      if (script === "start") {
        scripts[script] = "node main.js";
      } else if (script === "test") {
        scripts[script] =
          dataToWrite.jest === true ? "jest" : 'echo "Running tests..."';
      } else if (script === "build") {
        scripts[script] = 'echo "Building project..."';
      }
    });

    const devDependencies = dataToWrite.jest ? { jest: "latest" } : {};

    const content = JSON.stringify(
      {
        name: dataToWrite.name,
        version: dataToWrite.version,
        description: dataToWrite.description,
        author: dataToWrite.author,
        license: dataToWrite.license,
        main: "main.js",
        type: dataToWrite.type,
        scripts,
        ...isGit(),
        keywords: dataToWrite.keywords,
        devDependencies,
      },
      null,
      2,
    );

    fs.writeFileSync("package.json", content);
    console.log("package.json created successfully!");
  };

  const createGitignore = () => {
    const gitignoreContent = {
      basic: gitignore.basic,
      advanced: gitignore.advanced,
    };
    const gitignoreData =
      dataToWrite.gitignore === "custom"
        ? gitignore.custom
        : gitignoreContent[dataToWrite.gitignore] || gitignoreContent.basic;

    fs.writeFileSync(".gitignore", gitignoreData, "utf8");
    console.log(".gitignore created successfully!");
  };

  const createDirectories = () => {
    const dirsToCreate = ["src"];
    if (dataToWrite.subfolder) {
      dirsToCreate.push("src/utils", "src/config", "src/assets", "src/api");
    }

    dirsToCreate.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Directory created: ${dir}`);
      }
    });
  };

  createPackageJson();
  if (dataToWrite.git) createGitignore();
  if (dataToWrite.src) createDirectories();
};

export default gen;
