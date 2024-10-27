import fs from "fs";
import gitignore from "../templates/gitignore.js";
import nextJs from "../templates/next-js.js";
import nextTs from "../templates/next-ts.js";
import electron from "../templates/electron.js";
import { exec } from "child_process";
import cli from "../templates/cli.js";

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
    console.log("package.json dosyası oluşturuluyor...");
    const scripts = {};
    dataToWrite.scripts.forEach((script) => {
      if (script === "start") {
        if (
          dataToWrite.template === "next-js" ||
          dataToWrite.template === "next-ts"
        ) {
          scripts[script] = "next start";
        } else if (dataToWrite.template === "electron") {
          scripts[script] = "electron .";
        } else {
          scripts[script] = "node main.js";
        }
      } else if (script === "test") {
        scripts[script] =
          dataToWrite.jest === true ? "jest" : 'echo "Running tests..."';
      } else if (script === "build") {
        if (
          dataToWrite.template === "next-js" ||
          dataToWrite.template === "next-ts"
        ) {
          scripts[script] = "next build";
        } else {
          scripts[script] = 'echo "Building project..."';
        }
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
        type: dataToWrite.type,
        scripts,
        ...isGit(),
        keywords: dataToWrite.keywords,
        devDependencies,
      },
      null,
      2
    );

    fs.writeFileSync("package.json", content);
    console.log("package.json dosyası başarıyla oluşturuldu.");

    if (dataToWrite.projectxrc) {
      fs.writeFileSync(".projectxrc", JSON.stringify(dataToWrite, null, 2));
      console.log(".projectxrc dosyası başarıyla oluşturuldu.");
    }
  };

  console.log("NPM paketleri yüklenecek...");
  exec("npm install", (error) => {
    if (error) {
      console.error(`NPM yüklenirken hata oluştu: ${error.message}`);
      return;
    }

    console.log("NPM paketleri başarıyla yüklendi.");
  });

  if (dataToWrite.template === "next-js") {
    console.log("Next.js projesi oluşturuluyor...");
    exec("npm install next@latest react@latest react-dom@latest", (error) => {
      if (error) {
        console.error(`Next.js yüklenirken hata oluştu: ${error.message}`);
        return;
      }

      fs.mkdirSync("src/app", { recursive: true });
      fs.writeFileSync("src/app/page.jsx", nextJs.page);
      fs.writeFileSync("src/app/layout.jsx", nextJs.layout);
      console.log("Next.js projesi başarıyla oluşturuldu.");
    });
  } else if (dataToWrite.template === "next-ts") {
    console.log("Next.js TypeScript projesi oluşturuluyor...");
    exec("npm install next@latest react@latest react-dom@latest", (error) => {
      if (error) {
        console.error(`Next.js TypeScript yüklenirken hata oluştu: ${error.message}`);
        return;
      }

      fs.mkdirSync("src/app", { recursive: true });
      fs.writeFileSync("src/app/page.tsx", nextTs.page);
      fs.writeFileSync("src/app/layout.tsx", nextTs.layout);
      console.log("Next.js TypeScript projesi başarıyla oluşturuldu.");
    });
  } else if (dataToWrite.template === "electron") {
    console.log("Electron projesi oluşturuluyor...");
    exec("npm install --save-dev electron", (error) => {
      if (error) {
        console.error(`Electron yüklenirken hata oluştu: ${error.message}`);
        return;
      }

      fs.writeFileSync("index.html", electron.index);
      console.log("Electron projesi başarıyla oluşturuldu.");
    });
  } else if (dataToWrite.template === "cli") {
    console.log("CLI projesi oluşturuluyor...");
    exec("npm install --save-dev inquirer", (error) => {
      if (error) {
        console.error(`CLI yüklenirken hata oluştu: ${error.message}`);
        return;
      }

      fs.writeFileSync("main.js", 'console.log("Hello, world!")');
      console.log("CLI projesi başarıyla oluşturuldu.");
      content.main = "main.js";
    });
  } else {
    console.log("Ana projeniz oluşturuluyor...");
    exec("npm install", (error) => {
      if (error) {
        console.error(`Ana proje yüklenirken hata oluştu: ${error.message}`);
        return;
      }

      fs.writeFileSync("main.js", cli.main);
      console.log("Ana projeniz başarıyla oluşturuldu.");
      content.main = "main.js";
    });
  }

  const createGitignore = () => {
    console.log(".gitignore dosyası oluşturuluyor...");
    const gitignoreContent = {
      basic: gitignore.basic,
      advanced: gitignore.advanced,
    };
    const gitignoreData =
      dataToWrite.gitignore === "custom"
        ? gitignore.custom
        : gitignoreContent[dataToWrite.gitignore] || gitignoreContent.basic;

    fs.writeFileSync(".gitignore", gitignoreData, "utf8");
    console.log(".gitignore dosyası başarıyla oluşturuldu.");
  };

  const createDirectories = () => {
    console.log("Gerekli dizinler oluşturuluyor...");
    const dirsToCreate = ["src"];
    if (dataToWrite.subfolder) {
      dirsToCreate.push("src/utils", "src/config", "src/assets", "src/api");
    }

    dirsToCreate.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`${dir} dizini başarıyla oluşturuldu.`);
      }
    });
  };

  createPackageJson();
  if (dataToWrite.git) createGitignore();
  if (dataToWrite.src) createDirectories();
};

export default gen;
