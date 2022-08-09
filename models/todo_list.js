const { DataTypes } = require('sequelize');
const db = require('../config/connDB');
const activity = require('./activity_group');

// Define schema
const TodoList = db.define('todo_lists', {
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    activity_group_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        model:activity,
        key:'id'
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    is_active: {
        type: DataTypes.ENUM('true','false'),
        allowNull: false,
        defaultValue:'true'
    },
    priority: {
        type: DataTypes.ENUM('very-high','high','normal','low','very-low'),
        allowNull: false,
        defaultValue:'very-high'
    }

},{
    timestamps: true,
    createdAt : 'created_at',
    updatedAt : 'updated_at'
},{
  // Freeze Table Name
  freezeTableName: true,
});
 
activity.hasMany(TodoList,{
    sourceKey: 'id',
    foreignKey: 'activity_group_id',
    as: 'Activity'
})
TodoList.belongsTo(activity,{
    targetKey:'id',
    foreignKey:'activity_group_id',
    as: 'TodoList'
})

// Export model
module.exports = TodoList;