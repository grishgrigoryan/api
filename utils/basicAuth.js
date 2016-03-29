var config = require('./config');
var helper = require('./helper');

var checkCredentials = function(req) {
    if (!req) {
        throw new TypeError('argument req is required')
    }
    var header = (req.req || req).headers.authorization;
    var match = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9\-\._~\+\/]+=*) *$/.exec(header || '');
    if (!match) {
        return false
    }
    var userPass = /^([^:]*):(.*)$/.exec(helper.decodeBase64(match[1]));

    if (!userPass) {
        return false
    }
    if(userPass[1]==config['auth']['username'] && userPass[2]==config['auth']['password']){
        return true;
    }
    return false;
};

var addUnauthorizedHeader = function(res, realm) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="' + realm + '"');
    res.end('Unauthorized');
};

module.exports = function(req, res, next) {
    checkCredentials(req) ? next() :  addUnauthorizedHeader(res);
};


