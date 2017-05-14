'use strict';

const Db = require('./models');


exports.testDuplicateKey = (record, cb) => {

    const Todo = Db.Todo;

    Db.sequelize.sync().asCallback((err, result) => {

        if (err) {
            return cb(err, null);
        }

        Todo.create(record, {}).asCallback((err, created1) => {

            if (err) {
                return cb(err, null);
            }

            Todo.create(record).asCallback((err, created2) => {

                if (err) {
                    return cb(err, null);
                }

                Db.sequelize.close();
                return cb(null, created2);

            });
        });
    });

};

exports.testDelete = (records, cb) => {

    const Todo = Db.Todo;

    Db.sequelize.sync().asCallback((err, result) => {

        if (err) {
            return cb(err, null);
        }

        Todo.bulkCreate(records, {}).asCallback((err, created) => {

            if (err) {
                return cb(err, null);
            }

            Todo.destroy({ truncate: true, cascade: false }).asCallback((err, deleted) => {

                if (err) {
                    return cb(err, null);
                }

                Db.sequelize.close();
                return cb(null, deleted);

            });
        });
    });


};





