'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: 'institutions/',
        method: 'POST',
        handler: Handlers.createInstitution,
        config: {
            validate: {
                payload: Handlers.ValidatorInstitution
            }
        }
    },
    {
        path: 'institutions/{dbid}',
        method: 'PUT',
        handler: Handlers.updateInstitution,
        config: {
            validate: {
                payload: Handlers.ValidatorInstitution
            }
        }
    },
    {
        path: 'institutions/{dbid}',
        method: 'DELETE',
        handler: Handlers.deleteInstitution,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: 'institutions/',
        method: 'GET',
        handler: Handlers.findAllInstitution,
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
        path: 'institutions/{dbid}',
        method: 'GET',
        handler: Handlers.findInstitutionByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: 'institutions/{dbidInstitution}/file/',
        method: 'POST',
        handler: Handlers.createLicenseType,
        config: {
            validate: {
                payload: Handlers.ValidatorLicenseType
            }
        }
    },
    {
        path: 'institutions/{dbidInstitution}/file/{dbid}',
        method: 'PUT',
        handler: Handlers.updateLicenseType,
        config: {
            validate: {
                payload: Handlers.ValidatorLicenseType
            }
        }
    },

    {
        path: 'institutions/{dbidInstitution}/file/{dbid}',
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
        path: 'institutions/{dbidInstitution}/file/',
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
        path: 'institutions/{dbidInstitution}/file/{dbid}',
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