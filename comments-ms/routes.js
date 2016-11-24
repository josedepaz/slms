'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: 'institutions/{institutionId}/courses/{courseId}/publications/{publicationId}/comments/',
        method: 'POST',
        handler: Handlers.createComment,
        config: {
            validate: {
                payload: Handlers.Validator,
                params:{
                    institutionId: Joi.number().integer().min(1),
                    courseId: Joi.number().integer().min(1),
                    publicationId: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: 'institutions/{institutionId}/courses/{courseId}/publications/{publicationId}/comments/{dbid}',
        method: 'PUT',
        handler: Handlers.updateComment,
        config: {
            validate: {                
                params:{
                    institutionId: Joi.number().integer().min(1),
                    courseId: Joi.number().integer().min(1),
                    publicationId: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: 'institutions/{institutionId}/courses/{courseId}/publications/{publicationId}/comments/{dbid}',
        method: 'DELETE',
        handler: Handlers.deleteComment,
        config: {
            validate: {
                params: {
                    institutionId: Joi.number().integer().min(1),
                    courseId: Joi.number().integer().min(1),
                    publicationId: Joi.number().integer().min(1),
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: 'institutions/{institutionId}/courses/{courseId}/publications/{publicationId}/comments',
        method: 'GET',
        handler: Handlers.findAllComments,
        config: {
            validate: {
                query: {
                    limit: Joi.number().integer().min(1).max(100).default(0),
                    offset: Joi.number().integer().min(1).max(100).default(100)
                },
                params: {
                    institutionId: Joi.number().integer().min(1),
                    courseId: Joi.number().integer().min(1),
                    publicationId: Joi.number().integer().min(1)           
                }
            }
        }
    },
    {
        path: 'institutions/{institutionId}/courses/{courseId}/publications/{publicationId}/comments/{dbid}',
        method: 'GET',
        handler: Handlers.findCommentByDbid,
        config: {
            validate: {
                params: {
                    institutionId: Joi.number().integer().min(1),
                    courseId: Joi.number().integer().min(1),
                    publicationId: Joi.number().integer().min(1),
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];