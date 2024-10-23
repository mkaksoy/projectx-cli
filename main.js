#!/usr/bin/env node

import inquirer from "inquirer";
import { validateSemVer, validateUrl } from "./utils/validate.js";
import gen from "./utils/generator.js";

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your project?",
      default: "",
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of your project?",
      default: "",
    },
    {
      type: "input",
      name: "version",
      message: "What is the version of your project?",
      default: "1.0.0",
      validate: validateSemVer,
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
    // {
    //   type: "list",
    //   name: "template",
    //   message: "Which template do you want to use?",
    //   choices: [
    //     { name: "Basic Node.js (adds no extra dependencies)", value: "basic" },
    //     {
    //       name: "Basic Node.js TypeScript (adds typescript and ts-node)",
    //       value: "basic-ts",
    //     },
    //     { name: "Node.js CLI (adds inquirer)", value: "cli" },
    //     {
    //       name: "Next.js WEB Project (adds nextjs and other dependencies)",
    //       value: "nextjs",
    //     },
    //     {
    //       name: "Electron Desktop project (adds electron and other dependencies)",
    //       value: "electron",
    //     },
    //     { name: "WEB API Project (adds axios)", value: "api" },
    //     { name: "Custom (install dependencies yourself)", value: "custom" },
    //   ],
    //   default: "basic",
    // },
    // {
    //   type: "list",
    //   name: "nextTemplate",
    //   message: "Which template do you want to use?",
    //   choices: [
    //     { name: "Next.js with JavaScript (recommended)", value: "js" },
    //     {
    //       name: "Next.js with TypeScript (good for large projects)",
    //       value: "ts",
    //     },
    //   ],
    //   default: "js",
    //   when: (answers) => answers.template === "nextjs",
    // },
    // {
    //   type: "checkbox",
    //   name: "scripts",
    //   message: "Which code-quality tools do you want?",
    //   choices: [
    //     { name: "ESLint (also adds command lint to scripts)", value: "eslint" },
    //     {
    //       name: "Prettier (also adds command format to scripts)",
    //       value: "prettier",
    //     },
    //     {
    //       name: "Husky (also adds command prepare to scripts)",
    //       value: "husky",
    //     },
    //     { name: "lint-staged", value: "lint-staged" },
    //   ],
    //   default: ["eslint", "prettier"],
    // },
  ])
  .then((answers = {}) => {
    answers.keywords = answers.keywords.replace(/\s+/g, "").split(",");

    gen(answers);
  });
