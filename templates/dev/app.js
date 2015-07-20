var path = require('path');
var dfx_dep = require('dreamface');

dfx_dep.init({
	server_port: 3000,
	authConfPath: path.resolve(__dirname, './.auth.conf'),
	edition: 'development',
	storage: 'mongod',
	deployment_server_host: 'localhost',
    deployment_server_port: 3030
});

dfx_dep.start();