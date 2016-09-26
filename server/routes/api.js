var Action = require("../models/action");
module.exports = function (router) {
    // body...
    router.post('/action', function(req, res){
        var action = new Action();
        console.log(req.body);
        action.username = req.body.username;
        action.type = req.body.type;
        action.amount = req.body.amount;
        action.tag = req.body.tag;
        action.discript = req.body.discript;
        action.account = req.body.account;
        action.date = ((req.body.date).toString()).substring(0,10);
        action.active = "true";
        
        //action.username = "SivaMani";
        
        action.save(function(err, data){
            if(err)
                throw err;
            res.json({ data: data });
        });
    });
    
    router.get('/action', function(req, res){
        Action.find({}, function(err, data){
            if(err)
                throw err;
            res.json({ data: data });
        });
    });
    
    router.delete('/action', function(req, res){
        Action.remove({}, function (err) {
            res.json({result: err ? 'err' : 'OK'});
        });
    });
    
    // router.get('/action/:id', function(req, res){
    //     Action.findOne({_id: req.params.id}, function(err, data){
    //         if(err)
    //             throw err;
    //         res.json(data);
    //     });
    // });
    
    router.get('/action/:username', function(req, res){
        console.log(req);
        console.log(req.params.username);
        Action.find({username: req.params.username}, function(err, data){
            if(err)
                throw err;
            console.log(data);
            res.json({ data: data });
        });
    });
    
    router.delete('/action/:id', function(req, res){
       Action.remove({_id: req.params.id}, function(err, data){
            res.json({result: err ? 'err' : 'OK'});
        }); 
    });
    
    router.post('/action/:id', function (req, res) {
       Action.findOne({_id: req.params.id}, function(err, data){
           if(err)
                throw err;
            var action = data;
            action.username = req.body.username;
            action.type = req.body.type;
            action.amount = req.body.amount;
            action.tag = req.body.tag;
            action.discript = req.body.discript;
            action.account = req.body.account;
            action.date = req.body.date;
            action.active = req.body.active;
            action.save(function(err, data){
                if(err)
                    throw err;
                res.json({ data: data });
            });
       });
    });
}