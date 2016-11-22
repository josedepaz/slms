'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    user: Joi.number().required(),
    text: Joi.string().optional(),
    state: Joi.string().optional(),
    date: Joi.string().optional(),
    parent: Joi.number().optional(),
    publication: Joi.number().required()
});


// Create a new COMMENT
exports.createComment = function (request, reply) {
    const comment = {
        text: request.payload.text,
        state: request.payload.state,
        date: request.payload.date,
        user: request.payload.user,
        parent: request.payload.parent,
        publication: request.payload.publication
    }

    request.app.db.query('INSERT INTO COMMENT (text, state, date, user, parent, publication) VALUES (:text, :state, :date, :user, :parent, :publication)', comment, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId) {
            comment.dbid = result.insertId;
        }
        reply(comment);
    });
}


// Update a COMMENT
exports.updateComment = function (request, reply) {
    const comment = {
        dbid: request.params.dbid,
        text: request.payload.text,
        state: request.payload.state,
        date: request.payload.date,
        user: request.payload.user,
        parent: request.payload.parent,
        publication: request.payload.publication
    }

    request.app.db.query('UPDATE COMMENT SET text= :text, state = :state, publicator= :publicator, course_instance= :course_instance, activity= :activity ' +
        'WHERE dbid = :dbid', comment, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.insertId) {
                comment.dbid = result.insertId;
            }
            reply(comment);
        });
}

// Delete a COMMENT
exports.deleteComment = function (request, reply) {
    const comment = {
        dbid: request.params.dbid,
        state: 'DELETED'
    };

    request.app.db.query('UPDATE COMMENT SET state = :state ' +
        'WHERE dbid = :dbid', comment, (err, result) => {
            if (err) {
                throw err;
            }
            reply(comment);
        });
}


// Find all COMMENTs
exports.findAllComments = function (request, reply) {
    const pagination = {
        limit: request.query.limit,
        offset: request.query.offset,
        state: 'ACTIVE'
    }
    request.app.db.query('SELECT * FROM COMMENT ' +
        'WHERE state = :state LIMIT :limit, :offset', pagination, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            reply(rows);
        });
}

// Find all COMMENTs by dbid
exports.findCommentByDbid = function (request, reply) {
    const params = {
        dbid: request.params.dbid,
        state: 'ACTIVE'
    };
    request.app.db.query('SELECT * FROM COMMENT WHERE state = :state AND dbid = :dbid', params, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}