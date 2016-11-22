'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: '/',
        method: 'POST',
        handler: Handlers.createLicense,
        config: {
            validate: {
                payload: Handlers.Validator
            }
        }
    },
    {
        path: '/{dbid}',
        method: 'PUT',
        handler: Handlers.updateLicense
    },
    {
        path: '/{dbid}',
        method: 'DELETE',
        handler: Handlers.deleteLicense,
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
        handler: Handlers.findAllLicenses,
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
        handler: Handlers.findLicenseByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];