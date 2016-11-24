'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: 'licenses/',
        method: 'POST',
        handler: Handlers.createLicense,
        config: {
            validate: {
                payload: Handlers.ValidatorLicense
            }
        }
    },
    {
        path: 'licenses/{dbid}',
        method: 'PUT',
        handler: Handlers.updateLicense,
        config: {
            validate: {
                payload: Handlers.ValidatorLicense
            }
        }
    },
    {
        path: 'licenses/{dbid}',
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
        path: 'licenses/',
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
        path: 'licenses/{dbid}',
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
        path: 'license-types/',
        method: 'POST',
        handler: Handlers.createLicenseType,
        config: {
            validate: {
                payload: Handlers.ValidatorLicenseType
            }
        }
    },
    {
        path: 'license-types/{dbid}',
        method: 'PUT',
        handler: Handlers.updateLicenseType,
        config: {
            validate: {
                payload: Handlers.ValidatorLicenseType
            }
        }
    },

    {
        path: 'license-types/{dbid}',
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
        path: 'license-types/',
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
        path: 'license-types/{dbid}',
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