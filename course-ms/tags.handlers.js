'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    name: Joi.string().required(),
    description: Joi.string().optional()
});

// Find all TagsTypes
exports.findAllTagsTypes = function (request, reply) {
    const pagination = {
        limit: request.query.limit,
        offset: request.query.offset
    }
    request.app.db.query('SELECT * FROM TAG_TYPE LIMIT :limit, :offset', pagination, (err, rows, fields) => {
       
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find TagType by dbid
exports.findTagTypeByDbid = function (request, reply) {

    const params = { dbid: request.params.dbid };

    request.app.db.query('SELECT * FROM TAG_TYPE WHERE dbid = :dbid', params, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });

}

// Create a new TagType
exports.createTagType = function (request, reply) {
    const TagType = {
        name: request.payload.name,
        description: request.payload.description
    }

    request.app.db.query('INSERT INTO TAG_TYPE (name, description) VALUES (:name, :description)', TagType, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId){
            TagType.dbid = result.insertId;
        }
        reply(TagType);
    });
}

// Update a existent TagType
exports.updateTagType = function (request, reply) {
    const TagType = {
        dbid: request.payload.dbid,
        name: request.payload.name,
        description: request.payload.description
    }

    request.app.db.query('UPDATE TAG_TYPE SET  name = :name, description = :description WHERE dbid = :dbid', TagType, (err, result) => {
        if (err) {
            throw err;
        }
        reply(TagType);
    });
}

// Delete a existent TagType
exports.deleteTagType = function (request, reply) {
    const TagType = {
        dbid: request.params.dbid
    };

    request.app.db.query('DELETE FROM TAG_TYPE WHERE dbid = :dbid', TagType, (err, result) => {
        if (err) {
            throw err;
        }
        reply(TagType);
    });
}