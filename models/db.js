const mysql = require('mysql');
var env = process.env.NODE_ENV || "localhost";
var config = require("../config/config.json")[env];

var con = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});

"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};


fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "db.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
module.exports = db;