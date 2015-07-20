var path = require('path');
var compiler = require('dreamface-compiler');

compiler.init({
    dfx_path: path.resolve(__dirname, '../dev/node_modules/dreamface'),

        dfx_servers : [
            {
                name : 'dfx',
                cfg  : {
                    address : 'http://localhost:3000/',
                    credentials : {
                        consumer_key    : '',
                        consumer_secret : ''
                    }
                }
            }
        ]
    })
    .start();