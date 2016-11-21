'use strict';

const Joi = require('joi');
const dateFormat = require('dateformat');
const uuid = require('node-uuid');
const fs = require('fs');
const mkdirp = require('mkdirp');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().required(),
    name: Joi.string().required(),
    fileLocation: Joi.string().required(),
    uploadDate: Joi.date().required(),
    state: Joi.string().required()
});

// Find all files
exports.findAllFiles = function (request, reply) {    
    const filters = {
        state: 'ACTIVE'  
    };
    
    request.app.db.query('SELECT * FROM FILE WHERE state = :state', filters, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find file by dbid
exports.findFileByDbid = function (request, reply) {
    
    const filters = {
        state: 'ACTIVE',
        dbid: request.params.dbid
    };
        

    request.app.db.query('SELECT * FROM FILE WHERE dbid = :dbid AND state = :state', filters, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });

}

exports.downloadFileByDbid = function (request, reply) {
    const filters = {
        state: 'ACTIVE',
        dbid: request.params.dbid
    };
        

    request.app.db.query('SELECT * FROM FILE WHERE dbid = :dbid AND state = :state', filters, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply.file(rows[0].fileLocation);
    });
}

/**
* Handler para la carga de archivos.
* Permite subir un archivo al servidor, el archivo lo encuentra dentro del campo multipart 'file'
* El archivo es almacenado en el servidor dentro de una carpeta con el siguiente formato:
* <Anio>/<Mes>/<Dia del mes>/<Hora 0 - 23>/<Minuto>/<Segundo>/<hash>.bin
*/
exports.uploadFile = function (request, reply) {
    
    const file = {};
        
    const directory = dateFormat(new Date(), 'yyyy/mm/dd/H/MM/ss/');
    const fileName = uuid.v1() + '.bin';
    const payloadFile = request.payload['file'];
    
    file.fileLocation = directory + fileName;
    file.name = payloadFile.hapi.filename;
    file.description = "auto-generated";
    file.uploadDate = new Date();
    file.state = 'ACTIVE';
    mkdirp(directory, function(err) { 
        if (err) {
            throw err;
        }
        const wstream = fs.createWriteStream(file.fileLocation);
        payloadFile.pipe(wstream);
        
        request.app.db.query('INSERT INTO File (name, description, file_location, upload_date, state) VALUES (:name, :description, :location, :date, :state)', file, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.insertId){
                file.dbid = result.insertId;
            }
            reply(file);
        });     
        
    });        
    
}

// Delete a existent file
exports.deleteFile = function (request, reply) {
    
    const params = {
        dbid: request.params.dbid,
        state: 'DELETED'
    };

    request.app.db.query("UPDATE FILE SET state = :state WHERE dbid = :dbid", params, (err, result) => {
        if (err) {
            throw err;
        }
        reply(user);
    });

}