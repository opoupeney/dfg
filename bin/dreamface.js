#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp');
var os = require('os');
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var sortedObject = require('sorted-object');

var _exit = process.exit;
var eol = os.EOL;
var pkg = require('../package.json');

var version = pkg.version;

// Re-assign process.exit because of commander
// TODO: Switch to a different command framework
process.exit = exit