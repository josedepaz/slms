'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    text: Joi.string().optional(),
    state: Joi.string().optional(),
    date: Joi.string().optional(),
    publicator: Joi.string().required(),
    course_instance: Joi.number().required(),
    activity: Joi.number().optional()
});


// Create a new publication
exports.createPublication = function (request, reply) {
    const publication = {
        text: request.payload.text,
        state: 'ACTIVE',
        publicator: request.payload.publicator,
        course_instance: request.payload.course_instance,
        activity: request.payload.activity
    }

    request.app.db.query('INSERT INTO PUBLICATION (text, state, date, publicator, course_instance, activity) VALUES (:text, :state, CURDATE(), :publicator, :course_instance, :activity)', publication, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId) {
            publication.dbid = result.insertId;
        }
        reply(publication);
    });
}


// Update a publication
exports.updatePublication = function (request, reply) {
    const publication = {
        dbid: request.params.dbid,
        text: request.payload.text,
        state: request.payload.state,
        date: request.payload.date,
        publicator: request.payload.publicator,
        course_instance: request.payload.course_instance,
        activity: request.payload.activity
    }

    request.app.db.query('UPDATE PUBLICATION SET (text = :text, state = :state, publicator = :publicator, course_instance = :course_instance, activity = :activity WHERE dbid = :dbid)', publication, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId) {
            publication.dbid = result.insertId;
        }
        reply(publication);
    });
}

// Delete a publication
exports.deletePublication = function (request, reply) {
    const publication = {
        dbid: request.params.dbid,
        state: 'DELETED'
    };

    request.app.db.query('UPDATE PUBLICATION SET state = :state WHERE dbid = :dbid', publication, (err, result) => {
        if (err) {
            throw err;
        }
        reply(publication);
    });
}


// Find all publications
exports.findAllPublications = function (request, reply) {
    const publication = {
        state: 'ACTIVE'
    };

    request.app.db.query('SELECT * FROM PUBLICATION WHERE state = :state', publication, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find all publications by dbid
exports.findPublicationByDbid = function (request, reply) {
    const publication = {
        dbid: request.params.dbid,
        state: 'ACTIVE'
    };
    request.app.db.query('SELECT * FROM PUBLICATION WHERE state = :state AND dbid = :dbid', publication, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}