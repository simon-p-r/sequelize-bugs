'use strict';

module.exports = function (sequelize, DataTypes) {

    const Todo = sequelize.define('Todo', {
        title: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    },
        {
            classMethods: {
                associate: function (models) {
                // associations can be defined here
                }
            }
        });
    return Todo;
};
