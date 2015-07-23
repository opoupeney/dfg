var path = require('path');
var dfx_dep = require('dreamface');

dfx_dep.init({
	server_host: '0.0.0.0',
	server_port: 3030,
	authConfPath: path.resolve(__dirname, '../auth/.auth.conf'),
	edition: 'deployment',
	storage: 'file',
	fsdb_path: path.resolve(__dirname, './fsdb'),
	deploy_path : path.resolve(__dirname, './deploy')
});

dfx_dep.start();