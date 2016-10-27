'use strict';

require('dotenv').config();

const Confidence = require('confidence');
const Glue = require('glue');

const configFile = require('./config');
const store = new Confidence.Store(configFile);
const config = store.get('/', { env: process.env.NODE_ENV });

const Manifest = config.server;
const options = { relativeTo: __dirname };

Glue.compose(Manifest, options, (err, server) => {

    const basePlugins = [
        {
            register: require('./libs/db'),
            options: { config: config.db}
        }
    ];

    server.register(basePlugins, (err) => {
        let basePath = config.context.basePath;
        basePath = basePath && basePath !== '' ? '/' + basePath : '';

        const routes = require('./routes').map((v, k) => {
            v.path = basePath + v.path;
            return v;
        });

        server.route(routes);

        server.start((err) => {
            if (err) {
                throw err;
            }
            console.log('Server running at ' + server.info.uri);
        });
    });

});