'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: 'licences/',
        method: 'POST',
        handler: Handlers.createLicense,
        config: {
            validate: {
                payload: Handlers.Validator
            }
        }
    },
    {
        path: 'licences/{dbid}',
        method: 'PUT',
        handler: Handlers.updateLicense
    },
    {
        path: 'licences/{dbid}',
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
        path: 'licences/',
        method: 'GET',
        handler: Handlers.findAllLicense,
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
        path: 'licences/{dbid}',
        method: 'GET',
        handler: Handlers.findLicenseByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: 'licence-types/',
        method: 'POST',
        handler: Handlers.createLicenseType,
        config: {
            validate: {
                payload: Handlers.Validator
            }
        }
    },
    
    {
        path: 'licence-types/{dbid}',
        method: 'DELETE',
        handler: Handlers.deleteLicenseType,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: 'licence-types/',
        method: 'GET',
        handler: Handlers.findAllLicenseType,
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
        path: 'licence-types/{dbid}',
        method: 'GET',
        handler: Handlers.findLicenseTypeByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];