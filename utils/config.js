/**
 * Created by Grigor on 3/29/16.
 */
var fs      = require('fs'),
    path    = require('path');

module.exports = function(){
    var confFile	= path.resolve(__dirname,'../config.json'),
        config 		= JSON.parse(fs.readFileSync(confFile));
    return config[ process.env.APP_ENV || 'local'];
}();