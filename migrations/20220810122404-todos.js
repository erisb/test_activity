'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('todos', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            activity_group_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'activities'
                    },
                    key: 'id'
                }
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            is_active: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            priority: {
                type: DataTypes.ENUM('very-high','high','normal','low','very-low'),
                allowNull: true
            },
            status: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            deleted_at: Sequelize.DATE,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('todos');
    }
};
