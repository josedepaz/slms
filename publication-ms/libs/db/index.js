'use strict';

const MySql = require('mysql');

let db = {};

exports.register = function (server, options, next) {

    db = MySql.createPool(options.config);

    server.ext({
        type: 'onRequest',
        method: function (request, reply) {

            request.app.db = {
                query: query
            };

            return reply.continue();
        }
    });

    next();
};

function query(q, v, f) {
    db.getConnection((err, connection) => {

        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };

        connection.query(q, v, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            f(err, rows, fields);
        });

        connection.release();

    });
}

exports.register.attributes = {
    pkg: require('./package.json')
};
