'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: Handlers.findAllFiles
    },
    {
        path: '/{dbid}',
        method: 'GET',
        handler: Handlers.findFileByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: '/{dbid}/download',
        method: 'GET',
        handler: Handlers.downloadFileByDbid,
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
        handler: Handlers.uploadFile,
        config: {
            payload:{
                maxBytes: 209715200,
                output:'stream',
                parse: true                
            }
        }
    },
    {
        path: '/{dbid}',
        method: 'DELETE',
        handler: Handlers.deleteFile,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];