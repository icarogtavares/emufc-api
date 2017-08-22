"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require("./index");

let config = (0, _index.getConfig)({
    development: {
        username: "root",
        password: "root",
        database: "emufc",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: "root",
        password: "root",
        database: "emufc",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    },
    test: {
        username: "root",
        password: "root",
        database: "emufc_test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    }
});

exports.default = config;