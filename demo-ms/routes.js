'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: Handlers.findAllUsers
    },
    {
        path: '/{dbid}',
        method: 'GET',
        handler: Handlers.findUserByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: '/',
        method: 'POST',
        handler: Handlers.createUser,
        config: {
            validate: {
                payload: Handlers.Validator
            }
        }
    },
    {
        path: '/',
        method: 'PUT',
        handler: Handlers.updateUser
    },
    {
        path: '/{dbid}',
        method: 'DELETE',
        handler: Handlers.deleteUser,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];