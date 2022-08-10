const { DataTypes } = require('sequelize');
const db = require('../config/connDB');
// const todo = require('./todo_list');
 
// Define schema
const ActivityGroup = db.define('activities', {
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: true
    }

},{
    timestamps: true,
    createdAt : 'created_at',
    updatedAt : 'updated_at'
},{
  // Freeze Table Name
  freezeTableName: true,
});
 
// Export model
module.exports = ActivityGroup;