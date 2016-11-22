'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: '/',
        method: 'POST',
        handler: Handlers.createPublication,
        config: {
            validate: {
                payload: Handlers.Validator
            }
        }
    },
    {
        path: '/{dbid}',
        method: 'PUT',
        handler: Handlers.updatePublication
    },
    {
        path: '/{dbid}',
        method: 'DELETE',
        handler: Handlers.deletePublication,
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
        handler: Handlers.findAllPublications,
        config: {
            validate: {
                query: {
                    limit: Joi.number().integer().min(1).max(100).default(0),
                    offset: Joi.number().integer().min(1).max(100).default(100)
                }
            }
        }
    },
    {
        path: '/{dbid}',
        method: 'GET',
        handler: Handlers.findPublicationByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];