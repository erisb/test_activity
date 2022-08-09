const { Op } = require("sequelize");
const data = require('../models/activity_group');
const todo_list = require('../models/todo_list');
const response = require('../config/response_format');


exports.detilByEmail = async function(req,res){
    try {
        let dataAll = await data.findAndCountAll({
            where:{email:req.query.email},
            offset:0,
            limit:1000
        });
        
        res.json({
            "total":dataAll.count,
            "limit":1000,
            "skip":0,
            "data":dataAll.rows
        })
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};

exports.detilById = async function(req,res){
    try {
        let dataTodo = [];
        let dataAll = await data.findOne({
            where:{id:req.params.id},
            include: [{
                model: todo_list,
                as: 'Activity',
                attributes:['id','title','activity_group_id','is_active','priority']
            }],
        });

        dataAll.Activity.map(item => {
            dataTodo = [...dataTodo,
                    {
                        'id':item.id,
                        'title':item.title,
                        'activity_group_id':item.activity_group_id,
                        'is_active':item.is_active,
                        'priority':item.priority
                    }
                ]
        })
        
        res.json({
            "id":dataAll.id,
            "title":dataAll.title,
            "created_at":dataAll.created_at,
            "todo_items":dataTodo
        })
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};

exports.save = async function(req,res){
    try {
        await data.create({
            title:req.body.title,
            email:req.body.email
        });

        let dataAfterSave = await data.findAll({
            where:{
                email:req.body.email
            },
            limit:1,
            order:[
                ['id','DESC']
            ]
        });
        
        res.json({
            "id": dataAfterSave[0].id,
            "title": dataAfterSave[0].title,
            "email": dataAfterSave[0].email,
            "created_at": dataAfterSave[0].created_at,
            "updated_at": dataAfterSave[0].updated_at
        })
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }

};

exports.update = async function(req,res){
    try {
        await data.update({
            title:req.body.title,
        },{
            where:
            {
                id:req.params.id
            }
        });

        let dataAfterSave = await data.findOne({
            where:{
                id:req.params.id
            }
        });
        
        res.json({
            "id": dataAfterSave.id,
            "title": dataAfterSave.title,
            "email": dataAfterSave.email,
            "created_at": dataAfterSave.created_at,
            "updated_at": dataAfterSave.updated_at
        })

    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};

exports.delete = async function(req,res){
    try {
        await data.destroy({
            where:
            {
                id:req.params.id
            }
        });

        res.json({
            "status": "Success",
            "message": "Success",
            "data": {}
        })
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};