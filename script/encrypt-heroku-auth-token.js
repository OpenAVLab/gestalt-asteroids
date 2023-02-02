#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");

const axios = require("axios");
const GitUrlParse = require("git-url-parse");
const simpleGit = require("simple-git")(