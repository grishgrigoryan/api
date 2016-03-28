/**
 * Created by Grigor on 3/28/16.
 */
var mongoose     = require('mongoose');
var User     = require('./user');
var Schema       = mongoose.Schema;

var TopicSchema   = new Schema({
    name: String,
    subject: {type:Number,required:true},
    owner  : {type:Schema.Types.ObjectId,ref:'User',required:true}
},{ timestamps: true,autoIndex:false,strict:false });
TopicSchema.post('save', function (topic) {
    User.findByIdAndUpdate(topic.owner,
        {
            $push:{
                topics:topic._id,
            }
        }, function (err,res) {

        }
    );
});
module.exports = mongoose.model('Topic', TopicSchema);