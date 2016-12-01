'use strict';

const Joi = require('joi');

//const Handlers = require('./handlers');
const CoursesHandlers = require('./courses.handlers');
const TagsTypesHandlers = require('./tagsTypes.handlers');
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
        handler: TagsTypesHandlers.findAllTagsTypes,
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
        handler: TagsTypesHandlers.findTagTypeByDbid,
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
        handler: TagsTypesHandlers.createTagType,
        config: {
            validate: {
                payload: TagsTypesHandlers.Validator
            }
        }
    },
    {
        path: '/tag_types/',
        method: 'PUT',
        handler: TagsTypesHandlers.updateTagType,
        config: {
            validate: {
                payload: TagsTypesHandlers.Validator
            }
        }
    },
    {
        path: '/tag_types/{dbid}',
        method: 'DELETE',
        handler: TagsTypesHandlers.deleteTagType,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    //tags
    {
        path: '/tags/',
        method: 'GET',
        handler: TagsHandlers.findAllTags,
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
        path: '/tags/{dbid}',
        method: 'GET',
        handler: TagsHandlers.findTagByDbid,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    },
    {
        path: '/tags/',
        method: 'POST',
        handler: TagsHandlers.createTag,
        config: {
            validate: {
                payload: TagsHandlers.Validator
            }
        }
    },
    {
        path: '/tags/',
        method: 'PUT',
        handler: TagsHandlers.updateTag,
        config: {
            validate: {
                payload: TagsHandlers.Validator
            }
        }
    },
    {
        path: '/tags/{dbid}',
        method: 'DELETE',
        handler: TagsHandlers.deleteTag,
        config: {
            validate: {
                params: {
                    dbid: Joi.number().integer().min(1)
                }
            }
        }
    }
];