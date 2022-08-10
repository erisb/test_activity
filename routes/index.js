const express = require('express');
const routerApi = express.Router({caseSensitive:true,strict:true});
const routerAll = express.Router({caseSensitive:true,strict:true});
const activity_group = require('../controllers/activity_group_api');
const todo_list = require('../controllers/todo_list_api');
// const groupEndPoint = '';

//start activity group//
routerApi.post('/activity-groups',activity_group.save);
routerApi.patch('/activity-groups/:id',activity_group.update);
routerApi.delete('/activity-groups/:id',activity_group.delete);
routerApi.get('/activity-groups',activity_group.detilByEmail);
routerApi.get('/activity-groups/:id',activity_group.detilById);
//end activity group//

//start to do list//
routerApi.post('/todo-items',todo_list.save);
routerApi.patch('/todo-items/:id',todo_list.update);
routerApi.delete('/todo-items/:id',todo_list.delete);
routerApi.get('/todo-items',todo_list.detilByActivity);
routerApi.get('/todo-items/:id',todo_list.detilById);
//end to do list//

routerAll.use(routerApi);

module.exports = routerAll;