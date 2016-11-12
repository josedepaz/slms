'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    publicator: Joi.string().required(),
    course_instance: Joi.number().required()
});


// Create a new publication
exports.createPublication = function (request, reply) {
    const publication = {
        text: request.payload.text,
        state: request.payload.state,
        date: request.payload.date,
        publicator: request.payload.publicator,
        course_instance: request.payload.course_instance,
        activity: request.payload.activity
    }

    request.app.db.query('INSERT INTO PUBICATION (text, state, date, publicator, course_instance, activity) VALUES (:text, :state, :date, :publicator, :course_instance, :activity)', publication, (err, result) => {
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

    request.app.db.query('UPDATE PUBLICATION SET (text= :text, state = :state, publicator= :publicator, course_instance= :course_instance, activity= :activity WHERE dbid = :dbid)', publication, (err, result) => {
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
    const user = {
        dbid: request.params.dbid
    };

    request.app.db.query("UPDATE PUBLICATION SET state = 'DELETED' WHERE dbid = :dbid", user, (err, result) => {
        if (err) {
            throw err;
        }
        reply(user);
    });
}


// Find all publications
exports.findAllPublications = function (request, reply) {
    request.app.db.query("SELECT * FROM PUBICATION WHERE state = 'ACTIVE'", (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find all publications by dbid
exports.findPublicationByDbid = function (request, reply) {
    request.app.db.query("SELECT * FROM PUBICATION WHERE state = 'ACTIVE' AND dbid = :dbid", (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}