var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'CALL account_getall();';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = "INSERT INTO account(email, first_name, last_name) VALUES (?,?,?)";
    var queryData = [params.email, params.first_name, params.last_name];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getinfo = function(account_id, callback){
    var query = 'CALL account_getinfo(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE account SET email = ?, first_name = ?, last_name = ? WHERE account_id = ?';
    var queryData = [params.email, params.first_name, params.last_name, params.account_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.delete = function(account_id, callback){
    var query = 'CALL account_delete(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};