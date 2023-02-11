#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");

const axios = require("axios");
const GitUrlParse = require("git-url-parse");
const simpleGit = require("simple-git")();
const YAML = require("yaml");

/* Specific message contents stored as constants */

const keyComments = require("./keyComments.json");

const idempotenceMessage = `It appears that your token has been encrypted.
To run this script again, delete the \`before_deploy\` and \`deploy\` keys
from the .travis.yml file.`;

const successMessage = `Complete! Run \`git diff .travis.yml\` to check.`;

/* Clean up system state changes. */
const clean = () => {
  const externalFiles = [".tmp.key.pem", ".tmp.token.txt", ".tmp.token.enc"];
  externalFiles.forEach(file => {
    if (fs.existsSync(file)) fs.unlinkSync(file);
  });
};

/* Get a specific git remote URL. */
const getRemoteURL = (name, remotes) => {
  try {
    return remotes.filter(remote => remote.name === name)[0].refs.fetch;
  } catch (err) {
    console.log(
      `It appears that the remote ${name} does not exist.`,
      `Here is the full error:`,
      err
    );
  }
};

/* Run a command and return its stdout. */
const getOutputFromCommand = async (command, args) => {
  const response = await new Promise((resolve, reject) => {
    const process = spawn(command, args);

    const stdout = [];
    const stderr = [];

    process.stdout.on("data", data => {
      stdout.push(data);
    });

    process.stderr.on("data", data => {
      stderr.push(data);
    });

    process.on("close", code => {
      if (code) throw new Error(reject(stderr));
      resolve(stdout);
    });
  });
  return response;
};

/* Use git remote URLs to get app identifiers. */
const getNamesFromGit = () =>
  new Promise((resolve, reject) =>
    simpleGit.getRemotes(true, (err, res) => {
      if (err) throw new Error(reject(err));
      resolve({
        fullName: GitUrlParse(getRemoteURL("origin", res)).full_name,
        appName: GitUrlParse(getRemoteURL("heroku", res)).name
      });
    })
  );

/* Use the openssl command to encrypt an authentication token. */
const encryptHerokuToken = async () => {
  await getOutputFromCommand("openssl", [
    "rsautl",
    "-encrypt",
    "-pubin",
    "-inkey",
    ".tmp.key.pem",
    "-in",
    ".tmp.token.txt",
    "-out",
    ".tmp.token.enc"
  ]);
};

/* Write the encrypted key, and other values, to the .travis.yml file. */
const updateTravisYAML = (app, key) => {
  const travis = fs.readFileSync(".travis.yml", "utf8");
  const doc = YAML.parseDocument(travis);
  if (doc.has("before_deploy")) {
    return console.