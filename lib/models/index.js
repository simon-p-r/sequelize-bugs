'use strict';

const Fs = require('fs');
const Path = require('path');
const Sequelize = require('sequelize');

const basename = Path.basename(module.filename);
const dialect = process.env.DIALECT;
const configFile = Path.resolve(`./test/config/${dialect}.json`);
const db = {};

const Config = require(configFile);



const sequelize = new Sequelize(Config.database, Config.username, Config.password, Config);

Fs.readdirSync(__dirname)
  .filter((file) =>

    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {

      const model = sequelize.import(Path.join(__dirname, file));
      db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {

    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
