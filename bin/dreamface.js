#!/usr/bin/env node

var os = require('os');
var fs = require('fs');
var path = require('path');
var program = require('commander');
var mkdirp = require('mkdirp');
var readline = require('readline');

var _exit = process.exit;
var pkg = require('../package.json');
var version = pkg.version;
var eol = os.EOL;

process.exit = exit

before(program, 'outputHelp', function () {
  this.allowUnknownOption();
});

program
  .version(version)
  .usage('[options] [dir]')
  .option('-mod, --mod <mod>', 'install a DreamFace module', /^(dev|dep|docker)$/i)
  .parse(process.argv);

if (!exit.exited) {
  main();
}

/**
 * Install a before function; AOP.
 */

function before(obj, method, fn) {
  var old = obj[method];

  obj[method] = function () {
    fn.call(this);
    old.apply(this, arguments);
  };
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm(msg, callback) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(msg, function (input) {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input));
  });
}

/**
 * Create application at the given directory `path`.
 *
 * @param {String} path
 */

function createEnvironment(env_name, path) {
	var wait = 5;

	console.log();
	function complete() {
		if (--wait) return;
		var prompt = launchedFromCmd() ? '>' : '$';

		console.log();
		console.log('   install dependencies:');
		console.log('     %s cd %s && npm install', prompt, path);
		console.log();
		console.log('   run the dreamface env:');

		if (launchedFromCmd()) {
			console.log('     %s SET DEBUG=%s:* & npm start', prompt, env_name);
		} else {
			console.log('     %s DEBUG=%s:* npm start', prompt, env_name);e
		}
		console.log();
	}

	if (program.mod==='docker') {
		

	} else {

		mkdir(path, function() {

		  	// Generate app
		  	var app = '';
		  	var comp = null;
		  	switch (program.mod) {
		  		case 'dev':
		  			app = loadTemplate('dev/app.js');
            comp = loadTemplate('comp/app.js');
		  		case 'dep':
		  			app = loadTemplate('dep/app.js');
		  	}

			// package.json
			var pkg = {
        name: env_name+'_dev',
			  version: '0.0.1',
			  private: true,
			  scripts: { start: 'node ./app.js' },
			  dependencies: {
            'dreamface': '~2.2.0',
            'path': '~0.11.14'
			  }
			}

      // compiler's package.json
      var pkg_comp = {
        name: env_name+'_comp',
        version: '0.0.1',
        private: true,
        scripts: { start: 'node ./app.js' },
        dependencies: {
            'dreamface-compiler': '~1.0.0',
            'path': '~0.11.14'
        }
      }

      if (program.mod == 'dev') {
        mkdir('dev', function() {
          write(path + '/dev/package.json', JSON.stringify(pkg, null, 2));
          write(path + '/dev/app.js', app);
        });
        mkdir('comp', function() {
          write(path + '/comp/package.json', JSON.stringify(pkg_comp, null, 2));
          write(path + '/comp/app.js', comp);
        });
      } else {
        write(path + '/package.json', JSON.stringify(pkg, null, 2));
        write(path + '/app.js', app);
      }
      complete();
		});
	}
};

function copy_template(from, to) {
  from = path.join(__dirname, '..', 'templates', from);
  write(to, fs.readFileSync(from, 'utf-8'));
};

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
};

/**
 * Graceful exit for async STDIO
 */

function exit(code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done() {
    if (!(draining--)) _exit(code);
  }

  var draining = 0;
  var streams = [process.stdout, process.stderr];

  exit.exited = true;

  streams.forEach(function(stream){
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });

  done();
};

/**
 * Determine if launched from cmd.exe
 */

function launchedFromCmd() {
  return process.platform === 'win32'
    && process.env._ === undefined;
};

/**
 * Load template file.
 */

function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
};

/**
 * Main program.
 */

function main() {
  // Path
  var destinationPath = program.args.shift() || '.';
  console.log('debug --mod:'+program.mod);
  console.log('debug dir:'+destinationPath);

  // App name
  var appName = path.basename(path.resolve(destinationPath));

  // Generate application
  emptyDirectory(destinationPath, function (empty) {
    if (empty || program.force) {
      createEnvironment(appName, destinationPath);
    } else {
      confirm('destination is not empty, continue? [y/N] ', function (ok) {
        if (ok) {
          process.stdin.destroy();
          createEnvironment(appName, destinationPath);
        } else {
          console.error('aborting');
          exit(1);
        }
      });
    }
  });
};

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0666 });
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
};

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
};