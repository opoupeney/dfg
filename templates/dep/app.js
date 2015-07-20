var path = require('path');
var dfx_dep = require('dreamface');

dfx_dep.init({
	server_port: 3030,
	authConfPath: path.resolve(__dirname, '../dev/.auth.conf'),
	edition: 'deployment',
	storage: 'file',
	fsdb_path: path.resolve(__dirname, './app_fsdb'),
	deploy_path : path.resolve(__dirname, './deploy')
});

dfx_dep.start();