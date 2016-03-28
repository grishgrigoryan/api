/**
 * Created by Grigor on 3/29/16.
 */

exports.decodeBase64=function(str) {
    return new Buffer(str, 'base64').toString()
};
