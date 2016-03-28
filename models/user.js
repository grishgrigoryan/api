/**
 * Created by Grigor on 3/28/16.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    username: String,
    age: Number,
    topics :[{type:Schema.Types.ObjectId,ref:'Topic'}]
},{ timestamps: true,autoIndex:false,strict:false });
module.exports = mongoose.model('User', UserSchema);