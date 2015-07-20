# DFX Generator

## Instalation instructions

DreamFace Generator creates all required

[License: DreamFace Open License](http://interactive-clouds.com/dreamface_license.txt)

## Installing the development environment

    $ npm install -g dreamface-generator

    $ dreamface -mod dev sampledev
    $ cd sampledev
    
    // Start DreamFace Development Edition
    [sampledev]		$ cd dev
    [sampledev/dev]	$ sudo npm install
    [sampledev/dev] $ cd node_modules/dreamface
    [sampledev/dev/node_modules/dreamface]	$ sudo npm install
	[sampledev/dev/node_modules/dreamface]	$ sudo grunt build
	[sampledev/dev/node_modules/dreamface]	$ cd ../..
	[sampledev/dev] $ node app.js

Log on to the console: http://localhost:3000/console
DreamFace will synchronize its repository on MongoDB. An (hidden) .auth.conf file will be created. Edit this file and copy the `consumer_key` and `consumer_secret` value. Edit the `sampledev/comp/app.js' file and set the `consumer_key` and `consumer_secret` of the compiler. This will initiate a secure connection between DreamFace and DreamFace Compiler.
	
	// Start DreamFace Compiler
    [sampledev]			$ cd comp
    [sampledev/comp]	$ node app.js


## Installing the deployment environment

	$ npm install -g dreamface-generator

    $ dreamface -mod dep sampleapp
    $ cd sampleapp
    [sampleapp]	$ sudo npm install
    [sampleapp]	$ node app.js