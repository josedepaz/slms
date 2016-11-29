'use strict';

const Joi = require('joi');

exports.ValidatorLicense = Joi.object().keys({
    dbid: Joi.number().optional(),
    code: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    state: Joi.string().optional()
});


// Create a new INSTITUTION
exports.createInstitution = function (request, reply) {
    const license = {
        code: request.payload.code,
        name: request.payload.name,
        description: request.payload.description,
        state: request.payload.state,
        institution: request.payload.institution
    }

    request.app.db.query('INSERT INTO INSTITUTION (code, name, description, state) ' +
        'VALUES (:code, :name, :description, :state)', license, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.insertId) {
                license.dbid = result.insertId;
            }
            reply(license);
        });
}

// Update a INSTITUTION
exports.updateInstitution = function (request, reply) {
    const license = {
        dbid: request.params.dbid,
        code: request.payload.code,
        name: request.payload.name,
        description: request.payload.description,
        state: request.payload.state
    }

    request.app.db.query('UPDATE INSTITUTION SET code = :code, name = :name, description = :description, state = :state ' +
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

// Delete a INSTITUTION
exports.deleteInstitution = function (request, reply) {
    const license = {
        dbid: request.params.dbid, 
        state: 'DELETED'
    };

    request.app.db.query('UPDATE INSTITUTION SET state = :state ' +
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



// Find all INSTITUTIONS
exports.findAllInstitution = function (request, reply) {
    const pagination = {
        limit: request.query.limit,
        offset: request.query.offset,
        state:'ACTIVE'
    }
    request.app.db.query('SELECT * FROM INSTITUTION ' +
    'WHERE state = :state LIMIT :limit, :offset', pagination, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}


// Find INSTITUTION by dbid
exports.findInstitutionByDbid = function (request, reply) {
    const params = {
        dbid: request.params.dbid,
        state: 'ACTIVE'
    };
    request.app.db.query('SELECT * FROM INSTITUTION ' +
        'WHERE dbid = :dbid AND state = :state', params, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            reply(rows);
        });
}


exports.ValidatorInstitutionFile = Joi.object().keys({
    file: Joi.number().optional(),
    institution: Joi.number().optional(),    
    type: Joi.string().optional()
});
// Create a new INSTITUTION_FILE
exports.createInstitutionFile = function (request, reply) {
    const licenseType = {
        file: request.payload.file,
        institution: request.payload.institution,        
        state: request.payload.state

    }

    request.app.db.query('INSERT INTO INSTITUTION_FILE (file, institution, type) ' +
        'VALUES (:file, :institution, :type)', licenseType, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.insertId) {
                licenseType.dbid = result.insertId;
            }
            reply(licenseType);
        });
}

// Update a INSTITUTION_FILE
exports.updateInstitutionFile = function (request, reply) {
    const licenseType = {    
        file: request.payload.file,
        institution: request.payload.institution,
        type: request.payload.type
    }

    request.app.db.query('UPDATE LICENSE SET file = type = :type ' +
        'WHERE file = :file AND institution = :institution', licenseType, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.insertId) {
                licenseType.dbid = result.insertId;
            }
            reply(licenseType);
        });
}
// Delete a INSTITUTION_FILE
exports.deleteInstitutionFile = function (request, reply) {
    const licenseType = {
        file: request.params.file,
        institution: request.params.institution,
    };

    request.app.db.query('DELETE INSTITUTION_FILE ' +
        ' WHERE file = :file AND institution = :institution', licenseType, (err, result) => {
            if (err) {
                throw err;
            }
            reply(licenseType);
        });
}
// Find all INSTITUTION_FILE
exports.findAllInstitutionFile = function (request, reply) {
    const pagination = {
        limit: request.query.limit,
        offset: request.query.offset
    }
    request.app.db.query('SELECT * FROM INSTITUTION_FILE LIMIT :limit, :offset', pagination, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}
// Find INSTITUTION_FILE by dbid
exports.findInstitutionFileByDbid = function (request, reply) {
    const params = {
        dbid: request.params.dbid
    };
    request.app.db.query('SELECT * FROM INSTITUTION_FILE ' +
        'WHERE file = :file AND institution = :institution', params, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            reply(rows);
        });
}