'use strict';

const Joi = require('joi');

//const Handlers = require('./handlers');
const CoursesHandlers = require('./courses.handlers');
const TagsHandlers = require('./tags.handlers');

module.exports = [
    //course
    {
        path: '/courses/',
        method: 'GET',
        handler: CoursesHandlers.findAllCourses,
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
        path: '/courses/{dbid}',
        method: 'GET',
        handler: CoursesHandlers.findCourseByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: '/courses/',
        method: 'POST',
        handler: CoursesHandlers.createCourse,
        config: {
            validate: {
                payload: CoursesHandlers.Validator
            }
        }
    },
    {
        path: '/courses/',
        method: 'PUT',
        handler: CoursesHandlers.updateCourse,
        config: {
            validate: {
                payload: CoursesHandlers.Validator
            }
        }
    },
    {
        path: '/courses/{dbid}',
        method: 'DELETE',
        handler: CoursesHandlers.deleteCourse,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    //tag_types
    {
        path: '/tag_types/',
        method: 'GET',
        handler: TagsHandlers.findAllTagsTypes,
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
        path: '/tag_types/{dbid}',
        method: 'GET',
        handler: TagsHandlers.findTagTypeByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: '/tag_types/',
        method: 'POST',
        handler: TagsHandlers.createTagType,
        config: {
            validate: {
                payload: TagsHandlers.Validator
            }
        }
    },
    {
        path: '/tag_types/',
        method: 'PUT',
        handler: TagsHandlers.updateTagType,
        config: {
            validate: {
                payload: TagsHandlers.Validator
            }
        }
    },
    {
        path: '/tag_types/{dbid}',
        method: 'DELETE',
        handler: TagsHandlers.deleteTagType,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];