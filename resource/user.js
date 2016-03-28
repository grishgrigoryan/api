/**
 * Created by Grigor on 3/28/16.
 */
var express     = require('express'),
    router      = express.Router(),
    User      = require('../models/user');


router.get('/:id', function(req, res) {
    User.findById( req.params.id).populate('topics').exec( function(err,data) {
        if (err) {
            res.json(err);
        }
        res.json(data);
    });
});
router.get('/', function(req, res) {
    User.find({}).then( function(data){
        res.json(data);
    }).catch(function (err) {
        res.json(err);
    });
});
router.post('/', function(req, res) {
    var user = new User(req.body);
    user.save().then(function(result){
        res.json(result);
    }).catch(function(err){
        res.json(err);
    });
});
module.exports=router;