'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('activities', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(200),
                allowNull: true
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            deleted_at: Sequelize.DATE,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('activities');
    }
};
