var express = require('express');
var router = express.Router();
var address_dal = require('../dal/address_dal');

router.get('/all', function(req, res){
    address_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else{
            res.render('address/address_view_all', {address:result[0],
                was_successful: req.query.was_successful});
        }
    });
});

router.get('/add', function(req, res){
    res.render('address/address_add');
});

router.get('/insert', function(req, res){
    address_dal.insert(req.query, function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302, '/address/all');
        }
    });
});

router.get('/edit', function(req, res){
    address_dal.getinfo(req.query.address_id, function(err,result){
        if(err){ res.send(err);}
        else{
            res.render('address/AddressUpdate',
                {addresses:result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    address_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else{
            res.redirect(302, '/address/all');
        }
    });
});

router.get('/delete', function(req, res){
    address_dal.delete(req.query.address_id, function(err, address_id){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/address/all?&was_successful=1');
        }
    });
});

module.exports = router;