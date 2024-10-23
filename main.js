#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import gen from "./src/utils/generator.js";
import {
  validateName,
  validateDescription,
  validateLicense,
  validateUrl,
  validateVersion,
} from "./src/utils/validate.js";

const projectXRCPath = path.join(process.cwd(), ".projectxrc");

if (fs.existsSync(projectXRCPath)) {
  const configContent = fs.readFileSync(projectXRCPath, "utf-8");
  const parsedConfig = JSON.parse(configContent);

  console.log("Using configuration from .projectxrc...");
  gen(parsedConfig);
} else {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        default: "",
        validate: validateName,
      },
      {
        type: "input",
        name: "description",
        message: "What is the description of your project?",
        default: "",
        validate: validateDescription,
      },
      {
        type: "input",
        name: "version",
        message: "What is the version of your project?",
        default: "1.0.0",
        validate: validateVersion,
      },
      {
        type: "input",
        name: "author",
        message: "Who is the author of the project?",
      },
      {
        type: "input",
        name: "license",
        message: "What is the license of your project?",
        default: "ISC",
        validate: validateLicense,
      },
      {
        type: "list",
        name: "type",
        message: "Which module system will you use in your project?",
        choices: [
          { name: "ES Module (recommended)", value: "module" },
          { name: "CommonJS", value: "commonjs" },
        ],
        default: "module",
      },
      {
        type: "input",
        name: "keywords",
        message: "What are the keywords of your project?",
      },
      {
        type: "confirm",
        name: "jest",
        message: "Do you want to use Jest?",
        default: true,
      },
      {
        type: "confirm",
        name: "git",
        message: "Do you want to initialize a Git repository?",
        default: true,
      },
      {
        type: "list",
        name: "gitProtocol",
        message: "What protocol do you want to use to connect to Git?",
        when: (answers) => answers.git === true,
        choices: [
          { name: "HTTPS", value: "https" },
          { name: "SSH (recommended)", value: "ssh" },
        ],
        default: "ssh",
      },
      {
        type: "input",
        name: "gitUrl",
        message: "What is the URL of your git repository?",
        when: (answers) => answers.git === true,
        validate: validateUrl,
      },
      {
        type: "list",
        name: "gitignore",
        message: "Which .gitignore template do you want?",
        choices: [
          { name: "Basic (recommended)", value: "basic" },
          { name: "Advanced (good for advanced projects)", value: "advanced" },
          { name: "Custom", value: "custom" },
        ],
        default: "basic",
        when: (answers) => answers.git === true,
      },
      {
        type: "checkbox",
        name: "scripts",
        message: "Which scripts would you like to add to your package.json?",
        choices: [
          { name: "Start script (npm start)", value: "start" },
          { name: "Test script (npm test)", value: "test" },
          { name: "Build script (npm run build)", value: "build" },
        ],
        default: [],
      },
      {
        type: "confirm",
        name: "src",
        message: "Do you want to use src/ folder? (recommended)",
        default: true,
      },
      {
        type: "confirm",
        name: "subfolder",
        message:
          "Do you want some subfolders (utils/, config/, assets/, api/) under the src/ folder? (recommended)",
        when: (answers) => answers.src === true,
        default: true,
      },
      {
        type: "confirm",
        name: "projectxrc",
        message:
          "Do you want your options to be saved in your .projectxrc file? (recommended)",
        default: true,
      },
    ])
    .then((answers = {}) => {
      answers.keywords = answers.keywords.replace(/\s+/g, "").split(",");
      gen(answers);
    });
}
