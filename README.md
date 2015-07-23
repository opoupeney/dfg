# DFX Generator

## Instalation instructions

DreamFace Generator creates all required

[License: DreamFace Open License](http://interactive-clouds.com/dreamface_license.txt)

## Installing the DreamFace X-Platform

    $ npm install -g dreamface-generator

    $ dreamface --init sample

## Installing the development environment
    
    $ cd sample
    
    // Start DreamFace Development Edition
    [sample]		$ cd dev
    [sample/dev]	$ sudo npm install
    [sample/dev] $ cd node_modules/dreamface
    [sample/dev/node_modules/dreamface]	$ sudo npm install
	[sample/dev/node_modules/dreamface]	$ sudo grunt build
	[sample/dev/node_modules/dreamface]	$ cd ../..
	[sampled/dev] $ node app.js

Log on to the console: http://localhost:3000/console
DreamFace will synchronize its repository on MongoDB. An (hidden) .auth.conf file will be created (located into sample/auth). Edit this file and copy the `consumer_key` and `consumer_secret` value. Edit the `sampledcomp/app.js' file and set the `consumer_key` and `consumer_secret` of the compiler. This will initiate a secure connection between DreamFace and DreamFace Compiler.
	
	// Start DreamFace Compiler
    [sample]		$ cd comp
    [sample/comp]	$ node app.js


## Installing the deployment environment

    $ cd sample/dep
    [sample/dep]	$ sudo npm install
    [sample/dep]	$ node app.js

## Deploy your running environment in a Docker container

	$ cd sample
	[sample] $	docker build -t username/sample .

A new image containing the dfx deployment edition and your deployed application will be created
To run the docker image inside a container:

	$ docker build -i -t -d username/sample