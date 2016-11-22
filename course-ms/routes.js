'use strict';

const Joi = require('joi');

const Handlers = require('./handlers');

module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: Handlers.findAllCourses,
        config: {
            validate: {
                query: {
                    limit: Joi.number().integer().min(0).max(100).default(0),
                    offset: Joi.number().integer().min(1).max(100).default(100)
                }
            }
        }
    },
    {
        path: '/{dbid}',
        method: 'GET',
        handler: Handlers.findCourseByDbid,
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
        handler: Handlers.createCourse,
        config: {
            validate: {
                payload: Handlers.Validator
            }
        }
    },
    {
        path: '/',
        method: 'PUT',
        handler: Handlers.updateCourse,
        config: {
            validate: {
                payload: Handlers.Validator
            }
        }
    },
    {
        path: '/{dbid}',
        method: 'DELETE',
        handler: Handlers.deleteCourse,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];