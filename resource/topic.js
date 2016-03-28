/**
 * Created by Grigor on 3/28/16.
 */
var express     = require('express'),
    router      = express.Router(),
    Topic      = require('../models/topic');

router.get('/:id', function(req, res) {
    Topic.findById( req.params.id).populate('owner').exec( function(err,data) {
        if (err) {
            res.json(err);
        }
        res.json(data);
    });
});
router.get('/', function(req, res) {
    Topic.find({}).then( function(data){
        res.json(data);
    }).catch(function (err) {
        res.json(err);
    });
});


router.post('/', function(req, res) {
    var topic = new Topic(req.body);
    topic.save().then(function(result){
        res.json(result);
    }).catch(function(err){
        res.json(err);
    });
});
module.exports=router;