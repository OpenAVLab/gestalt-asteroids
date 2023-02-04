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
    if (