'use strict';

const dateFormat = require('dateformat');
const fs = require('fs');
const Joi = require('joi');
const mkdirp = require('mkdirp');
const uuid = require('node-uuid');

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
/**
* Retorna el archivo cargado o 404 si no esta en el sistema.
*/
exports.downloadFileByDbid = function (request, reply) {
    const filters = {
        state: 'ACTIVE',
        dbid: request.params.dbid
    };
        

    request.app.db.query('SELECT * FROM FILE WHERE dbid = :dbid AND state = :state', filters, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        if(rows.length > 0){
            reply.file(rows[0].file_location, {filename: rows[0].name});
        } else {
            reply("Not found").code(404);
        }
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
    
    file.location = directory + fileName;
    file.name = payloadFile.hapi.filename;
    file.description = "auto-generated";
    file.date = new Date();
    file.state = 'ACTIVE';
    mkdirp(directory, function(err) { 
        if (err) {
            throw err;
        }
        const wstream = fs.createWriteStream(file.location);
        payloadFile.pipe(wstream);
        
        request.app.db.query('INSERT INTO FILE (name, description, file_location, upload_date, state) VALUES (:name, :description, :location, :date, :state)', file, (err, result) => {
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
        reply(params);
    });

}