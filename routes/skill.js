var express = require('express');
var router = express.Router();
var skill_dal = require('../dal/skill_dal');

router.get('/all', function(req, res, next){
    skill_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        } else {
            res.render('skill/skill_view_all', {skill:result[0],
                was_successful: req.query.was_successful});
        }
    })
});

router.get('/add', function(req, res){
    res.render('skill/skill_add');
});

router.get('/insert', function(req, res){
    skill_dal.insert(req.query, function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
         else{
            res.redirect(302, '/skill/all');
        }
    });
});

router.get('/edit', function(req, res){
    skill_dal.getinfo(req.query.skill_id, function(err,result){
        if(err){ res.send(err);}
        else{
            res.render('skill/SkillUpdate',
                {skills:result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    skill_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else{
            res.redirect(302, '/skill/all');
        }
    });
});

router.get('/delete', function(req, res){
    skill_dal.delete(req.query.skill_id, function(err, skill_id){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/skill/all?&was_successful=1');
        }
    });
});

module.exports = router;