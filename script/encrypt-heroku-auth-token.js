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
To run this script again, delete the \`before_de