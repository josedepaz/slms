'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    name: Joi.string().required(),
    description: Joi.string().optional(),
    tag_type: Joi.number().required()
});

// Find all Tags
exports.findAllTags = function (request, reply) {
    const pagination = {
        limit: request.query.limit,
        offset: request.query.offset
    }
    request.app.db.query('SELECT * FROM TAG LIMIT :limit, :offset', pagination, (err, rows, fields) => {
       
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find Tag by dbid
exports.findTagByDbid = function (request, reply) {

    const params = { dbid: request.params.dbid };

    request.app.db.query('SELECT * FROM TAG WHERE dbid = :dbid', params, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });

}

// Create a new Tag
exports.createTag = function (request, reply) {
    const Tag = {
        name: request.payload.name,
        description: request.payload.description,
        tag_type: request.payload.tag_type
    }

    request.app.db.query('INSERT INTO TAG (name, description, tag_type) VALUES (:name, :description, :tag_type)', Tag, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId){
            Tag.dbid = result.insertId;
        }
        reply(Tag);
    });
}

// Update a existent Tag
exports.updateTag = function (request, reply) {
    const Tag = {
        dbid: request.payload.dbid,
        name: request.payload.name,
        description: request.payload.description,
        tag_type: request.payload.tag_type
    }

    request.app.db.query('UPDATE TAG SET  name = :name, description = :description, tag_type = :tag_type WHERE dbid = :dbid', Tag, (err, result) => {
        if (err) {
            throw err;
        }
        reply(Tag);
    });
}

// Delete a existent Tag
exports.deleteTag = function (request, reply) {
    const Tag = {
        dbid: request.params.dbid
    };

    request.app.db.query('DELETE FROM TAG WHERE dbid = :dbid', Tag, (err, result) => {
        if (err) {
            throw err;
        }
        reply(Tag);
    });
}