var express = require('express');
var router = express.Router();
var account_dal = require('../dal/account_dal');

router.get('/all', function(req, res, next){
    account_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        } else{
            res.render('account/account_view_all', {account:result[0],
                was_successful: req.query.was_successful});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('account/account_add');
});

router.get('/insert', function(req, res){
    account_dal.insert(req.query, function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302, '/account/all');
        }
    });
});

router.get('/edit', function(req, res){
    account_dal.getinfo(req.query.account_id, function(err,result){
        if(err){ res.send(err);}
        else{
            res.render('account/AccountUpdate',
                {accounts:result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    account_dal.update(req.query, function(err,result){
        if(err) {
            res.send(err);
        }
        else{
            res.redirect(302, '/account/all');
        }
    });
});

router.get('/delete', function(req, res){
    account_dal.delete(req.query.account_id, function(err, account_id){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/account/all?&was_successful=1');
        }
    });
});

module.exports = router;