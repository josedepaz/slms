'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

// Find all files
exports.findAllFiles = function (request, reply) {
    request.app.db.query("SELECT * FROM File WHERE state = 'ACTIVE'", (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find file by dbid
exports.findFileByDbid = function (request, reply) {

    const user = { dbid: request.params.dbid };

    request.app.db.query("SELECT * FROM File WHERE dbid = :dbid AND state = 'ACTIVE'", user, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });

}

// Uploads a new file
exports.uploadFile = function (request, reply) {
    
    var fileSize = request.headers['content-length'];
    var uploadedBytes = 0 ;

    request.on('data',function(d){
        
        uploadedBytes += d.length;
        var p = (uploadedBytes/fileSize) * 100;
        response.write("Uploading " + parseInt(p)+ " %\n");

    });
    
    request.app.db.query('INSERT INTO File (name, email) VALUES (:name, :email)', user, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId){
            user.dbid = result.insertId;
        }
        reply(user);
    });
}

// Delete a existent file
exports.deleteFile = function (request, reply) {
    const user = {
        dbid: request.params.dbid
    };

    request.app.db.query("UPDATE File SET state = 'DELETED' WHERE dbid = :dbid", user, (err, result) => {
        if (err) {
            throw err;
        }
        reply(user);
    });
}