'use strict';

const Joi = require('joi');

exports.Validator = Joi.object().keys({
    dbid: Joi.number().optional(),
    institution: Joi.number().required(),
    code: Joi.string().required(),
    name: Joi.string().required(),
    state: Joi.number().required()
});

// Find all Courses
exports.findAllCourses = function (request, reply) {
    const pagination = {
        limit: request.query.limit,
        offset: request.query.offset,
        state: 'ACTIVE'
    }
    request.app.db.query('SELECT * FROM COURSE WHERE state = :state LIMIT :limit, :offset', pagination, (err, rows, fields) => {
        
        if (err) {
            throw err;
        }
        reply(rows);
    });
}

// Find Course by dbid
exports.findCourseByDbid = function (request, reply) {

    const course = { dbid: request.params.dbid };

    request.app.db.query('SELECT * FROM COURSE WHERE dbid = :dbid', course, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        reply(rows);
    });

}

// Create a new course
exports.createCourse = function (request, reply) {
    const course = {
        institution: request.payload.institution,
        code: request.payload.code,
        name: request.payload.name,
        description: request.payload.description,
        state: request.payload.state
    }

    request.app.db.query('INSERT INTO COURSE (institution, code, name, description, state) VALUES (:institution, :code, :name, :description, :state)', course, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.insertId){
            course.dbid = result.insertId;
        }
        reply(course);
    });
}

// Update a existent course
exports.updateCourse = function (request, reply) {
    const course = {
        dbid: request.payload.dbid,
        institution: request.payload.institution,
        code: request.payload.code,
        name: request.payload.name,
        description: request.payload.description,
        state: request.payload.state
    }

    request.app.db.query('UPDATE  COURSE SET institution = :institution , code = :code, name = :name, description = :description, state = :state WHERE dbid = :dbid', course, (err, result) => {
        if (err) {
            throw err;
        }
        reply(course);
    });
}

// Delete a existent course
exports.deleteCourse = function (request, reply) {
    const course = {
        dbid: request.params.dbid
    };

    request.app.db.query('DELETE FROM COURSE WHERE dbid = :dbid', course, (err, result) => {
        if (err) {
            throw err;
        }
        reply(course);
    });
}