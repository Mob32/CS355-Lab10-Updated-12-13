var express = require('express');
var router = express.Router();
var resume_dal = require('../dal/resume_dal');
var account_dal = require('../dal/account_dal');

module.exports = router;

router.get('/all', function(req, res, next){
    resume_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        } else{
            res.render('resume/resume_view_all', {resumes:result[0],
                was_successful: req.query.was_successful});
        }
    })
});

router.get('/add', function(req,res){
    resume_dal.getinfo(req.query.account_id, function(err,result){
        if(err){ res.send(err);}
        else{
            res.render('resume/resume_add', {account_id: req.query.account_id,
            skill_res:result[0], school_res:result[1], company_res:result[2]});
        }
    });
});

router.get('/add/selectuser', function(req, res) {
    account_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resume_selectuser', {res_user: result[0]});
        }
    });
});

router.get('/insert', function(req, res){
    resume_dal.insert(req.query, function(err,resume_id){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/resume/edit?resume_id=' + resume_id + '&was_successful=1');
        }
    });
});

router.get('/edit', function(req, res){
    resume_dal.geteditinfo(req.query.resume_id, function(err,result){
        if(err){ res.send(err);}
        else{
            res.render('resume/ResumeUpdate',
                {resume_id: req.query.resume_id, resume_name:result[0][0],
                    res_skill:result[1], res_school:result[2],
                    res_company:result[3], was_successful: req.query.was_successful});
        }
    });
});

router.get('/update', function(req, res){
    resume_dal.update(req.query, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/resume/all');
        }
    });
});

router.get('/delete', function(req, res){
    resume_dal.delete(req.query.resume_id, function(err, resume_id){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/resume/all?&was_successful=1');
        }
    });
});

module.exports = router;