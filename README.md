# DFX Generator

## Installation instructions

DreamFace Generator creates all required files to setup a complete cloud application development environment using DreamFace X-Platform

[License: DreamFace Open License](http://interactive-clouds.com/dreamface_license.txt)

## Installing DreamFace X-Platform

    $ sudo npm install -g dreamface-generator

    $ dreamface --init sample

where `sample` is the directory where your own cloud app platform using dreamface will be installed.

For help do :

    $ dreamface --help

## Installing the development environment

Before starting the install of the development environment, make sure you have installed `MongoDB` and it is running (`mongod`).
    
    $ cd sample
    
    // Start DreamFace Development Edition
    [sample]		$ cd dev
    [sample/dev]	$ sudo npm install
    [sample/dev] $ cd node_modules/dreamface
    [sample/dev/node_modules/dreamface]	$ sudo npm install
	[sample/dev/node_modules/dreamface]	$ sudo grunt build
	[sample/dev/node_modules/dreamface]	$ cd ../..
	[sampled/dev] $ node app.js

Log on to the console: `http://localhost:3000/console`
DreamFace will synchronize its repository on MongoDB. The first time you login to the console use `sys/admin` for login and password. You will be asked to change the password. Change the password and login with the new password. Create a tenant for examples `demo`.  You can leave DreamFace and we can continue the installation.

When you logged in a (hidden) `.auth.conf` file was created (located into sample/auth). Edit this file and copy the `consumer_key` and `consumer_secret values`. Edit the `sample/comp/app.js` file and set the `consumer_key` and and `consumer_secret` of the compiler and save the file. It should look like this after your modification with your own consumer_key and consumer secret_values:

   consumer_key    : 'b7d94f7d89a2',
   consumer_secret : '0866b51e983ad2ea13aea768'

This will initiate a secure connection between DreamFace and DreamFace Compiler. Now you can install and start the compiler.
	
Open a console window:

	// Start DreamFace Compiler
    [sample]		$ cd comp
    [sample/comp]   $ sudo npm install
    [sample/comp]	$ node app.js

## Installing the deployment environment

Open a console window:

    $ cd sample/dep
    [sample/dep]	$ sudo npm install
    [sample/dep]	$ node app.js

At this point, you have successfully installed the DreamFace X-Platform. You are now ready to build, compile and securely deploy your first application.

Continue to the [DreamFace Getting Started](http://interactive-clouds.com/documentation/getting-started.html)

## Deploy your running environment in a Docker container

When your app is ready to go on production, you can deploy it in a Docker container. DreamFace Generator created a Dockerfile for you to ease the creation of a docker image. To to so, open a console window and do the following:

	$ cd sample
	[sample] $	docker build -t username/sample .

A new image containing the dfx deployment edition and your deployed application will be created
To run the docker image inside a container:

	$ docker build -i -t -d username/sample