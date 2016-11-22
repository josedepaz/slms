'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    validity_start: Joi.date().required(),
    validity_end: Joi.date().optional(),
    licence_type: Joi.number().optional(),
    allowed_users: Joi.string().optional(),
    institution: Joi.number().optional()
});


// Create a new LICENSE
exports.createLicense = function (request, reply) {
    const license = {
        validity_start: request.payload.validity_start,
        validity_end: request.payload.validity_end,
        licence_type: request.payload.licence_type,
        allowed_users: request.payload.allowed_users,
        institution: request.payload.institution
    }

    request.app.db.query('INSERT INTO LICENSE (validity_start, validity_end, licence_type, allowed_users, institution) ' +
        'VALUES (:validity_start, :validity_end, :licence_type, :allowed_users, :institution)', license, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.insertId) {
                license.dbid = result.insertId;
            }
            reply(license);
        });
}


// Update a LICENSE
exports.updateLicense = function (request, reply) {
    const license = {
        dbid: request.params.dbid,
        validity_start: request.payload.validity_start,
        validity_end: request.payload.validity_end,
        licence_type: request.payload.licence_type,
        allowed_users: request.payload.allowed_users,
        institution: request.payload.institution
    }

    request.app.db.query('UPDATE LICENSE SET validity_start = :validity_start, validity_end = :validity_end, licence_type = :licence_type, allowed_users = :allowed_users, institution = :institution ' +
        'WHERE dbid = :dbid', license, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.insertId) {
                license.dbid = result.insertId;
            }
            reply(license);
        });
}

// Delete a LICENSE
exports.deleteLicense = function (request, reply) {
    const license = {
        dbid: request.params.dbid
    };

    request.app.db.query('DELETE LICENSE ' +
        ' WHERE dbid = :dbid', license, (err, result) => {
            if (err) {
                throw err;
            }
            reply(license);
        });
}


// Find all LICENSEs
exports.findAllLicenses = function (request, reply) {
    const pagination = {
        limit: request.query.limit,
        offset: request.query.offset
    }
    request.app.db.query('SELECT * FROM LICENSE LIMIT :limit, :offset', pagination, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find all LICENSEs by dbid
exports.findLicenseByDbid = function (request, reply) {
    const params = {
        dbid: request.params.dbid
    };
    request.app.db.query('SELECT * FROM LICENSE ' +
        'WHERE dbid = :dbid', params, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            reply(rows);
        });
}