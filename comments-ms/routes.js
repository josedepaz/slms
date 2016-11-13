'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: '/',
        method: 'POST',
        handler: Handlers.createComment,
        config: {
            validate: {
                payload: Handlers.Validator
            }
        }
    },
    {
        path: '/{dbid}',
        method: 'PUT',
        handler: Handlers.updateComment
    },
    {
        path: '/{dbid}',
        method: 'DELETE',
        handler: Handlers.deleteComment,
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
        method: 'GET',
        handler: Handlers.findAllComments
    },
    {
        path: '/{dbid}',
        method: 'GET',
        handler: Handlers.findCommentByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];