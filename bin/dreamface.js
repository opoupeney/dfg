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
  .option('-init, --init', 'install the DreamFace cross platform')
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

	if (program.docker) {
		

	} else if (program.init) {

		mkdir(path, function() {

	  	var app_dev = loadTemplate('dev/app.js'),
          comp = loadTemplate('comp/app.js'),
	  			app_dep = loadTemplate('dep/app.js'),
          docker = loadTemplate('docker/Dockerfile'),
          rex = new RegExp('{path}', 'g');

			var pkg_dev = {
        name: env_name+'_dev',
			  version: '0.0.1',
			  private: true,
			  scripts: { start: 'node ./app.js' },
			  dependencies: {
            'dreamface': '~2.2.2',
            'path': '~0.11.14'
			  }
			}

      var pkg_comp = {
        name: env_name+'_comp',
        version: '0.0.1',
        private: true,
        scripts: { start: 'node ./app.js' },
        dependencies: {
            'dreamface-compiler': '~1.0.2',
            'path': '~0.11.14'
        }
      }

      var pkg_dep = {
        name: env_name+'_dep',
        version: '0.0.1',
        private: true,
        scripts: { start: 'node ./app.js' },
        dependencies: {
            'dreamface': '~2.2.2',
            'path': '~0.11.14'
        }
      }
      
      mkdir(path + '/auth');

      mkdir(path + '/dev', function() {
        write(path + '/dev/package.json', JSON.stringify(pkg_dev, null, 2));
        write(path + '/dev/app.js', app_dev);
      });
      mkdir(path + '/comp', function() {
        write(path + '/comp/package.json', JSON.stringify(pkg_comp, null, 2));
        write(path + '/comp/app.js', comp);
      });
      mkdir(path + '/dep', function() {
        write(path + '/dep/package.json', JSON.stringify(pkg_dep, null, 2));
        write(path + '/dep/app.js', app_dep);
      });

      docker = docker.replace(rex, path);
      write(path + '/Dockerfile', docker);

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
 */

function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
};

/**
 * Exit for async STDIO
 */

function exit(code) {
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
 */

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0666 });
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
};

/**
 * Mkdir -p.
 */

function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
};