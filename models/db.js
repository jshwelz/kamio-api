const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin11",
  database:'hivestag_kamio_v56_gamma'  
});

"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
//var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var config = require("../config/config.json")[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};
 
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "db.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
 
 
db.sequelize = sequelize;

 
module.exports = db;