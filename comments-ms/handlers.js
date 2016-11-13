'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    user: Joi.string().required()
});


// Create a new COMMENT
exports.createComment = function (request, reply) {
    const COMMENT = {
        text: request.payload.text,
        state: request.payload.state,
        date: request.payload.date,
        user: request.payload.user,
        parent: request.payload.parent,
        publication: request.payload.publication
    }

    request.app.db.query('INSERT INTO COMMENT (text, state, date, user, parent, publication) VALUES (:text, :state, :date, :user, :parent, :publication)', COMMENT, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId) {
            COMMENT.dbid = result.insertId;
        }
        reply(COMMENT);
    });
}


// Update a COMMENT
exports.updateComment = function (request, reply) {
    const COMMENT = {
        dbid: request.params.dbid,
        text: request.payload.text,
        state: request.payload.state,
        date: request.payload.date,
        user: request.payload.user,
        parent: request.payload.parent,
        publication: request.payload.publication
    }

    request.app.db.query('UPDATE COMMENT SET (text= :text, state = :state, publicator= :publicator, course_instance= :course_instance, activity= :activity WHERE dbid = :dbid)', COMMENT, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId) {
            COMMENT.dbid = result.insertId;
        }
        reply(COMMENT);
    });
}

// Delete a COMMENT
exports.deleteComment = function (request, reply) {
    const user = {
        dbid: request.params.dbid
    };

    request.app.db.query("UPDATE COMMENT SET state = 'DELETED' WHERE dbid = :dbid", user, (err, result) => {
        if (err) {
            throw err;
        }
        reply(user);
    });
}


// Find all COMMENTs
exports.findAllComments = function (request, reply) {
    request.app.db.query("SELECT * FROM COMMENT WHERE state = 'ACTIVE'", (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find all COMMENTs by dbid
exports.findCommentByDbid = function (request, reply) {
    request.app.db.query("SELECT * FROM PUBICATION WHERE state = 'ACTIVE' AND dbid = :dbid", (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}