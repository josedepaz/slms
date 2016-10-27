'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

// Find all users
exports.findAllUsers = function (request, reply) {
    request.app.db.query('SELECT * FROM User', (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find users by dbid
exports.findUserByDbid = function (request, reply) {

    const user = { dbid: request.params.dbid };

    request.app.db.query('SELECT * FROM User WHERE dbid = :dbid', user, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });

}

// Create a new user
exports.createUser = function (request, reply) {
    const user = {
        name: request.payload.name,
        email: request.payload.email
    }

    request.app.db.query('INSERT INTO User (name, email) VALUES (:name, :email)', user, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId){
            user.dbid = result.insertId;
        }
        reply(user);
    });
}

// Update a existent user
exports.updateUser = function (request, reply) {
    reply('Update User');
}

// Delete a existent user
exports.deleteUser = function (request, reply) {
    const user = {
        dbid: request.params.dbid
    };

    request.app.db.query('DELETE User WHERE dbid = :dbid', user, (err, result) => {
        if (err) {
            throw err;
        }
        reply(user);
    });
}