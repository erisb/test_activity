const { Op } = require("sequelize");
const data = require('../models/todo_list');
const response = require('../config/response_format');


exports.detilByActivity = async function(req,res){
    try {
        let dataAll = await data.findAndCountAll({
            where:{activity_group_id:req.query.activity_group_id},
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
        let dataAll = await data.findOne({
            where:{id:req.params.id}
        });

        res.json({
            "id":dataAll.id,
            "title":dataAll.title,
            "is_active":dataAll.is_active,
            "priority":dataAll.priority
        })
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};

exports.save = async function(req,res){
    try {
        await data.create({
            activity_group_id:req.body.activity_group_id,
            title:req.body.title
        });

        let dataAfterSave = await data.findAll({
            where:{
                activity_group_id:req.body.activity_group_id
            },
            limit:1,
            order:[
                ['id','DESC']
            ]
        });
        
        res.json({
            "id": dataAfterSave[0].id,
            "title": dataAfterSave[0].title,
            "activity_group_id": dataAfterSave[0].activity_group_id,
            "is_active": dataAfterSave[0].is_active,
            "priority":dataAfterSave[0].priority,
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
            is_active:req.body.is_active,
            priority:req.body.priority
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
            "activity_group_id": dataAfterSave.activity_group_id,
            "is_active": dataAfterSave.is_active,
            "priority":dataAfterSave.priority,
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