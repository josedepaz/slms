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
        handler: Handlers.findAllPublications
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