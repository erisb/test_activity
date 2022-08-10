const { Op } = require("sequelize");
const data = require('../models/todo_list');
const response = require('../config/response_format');


exports.detilByActivity = async function(req,res){
    try {
        
        let dataAll = await data.findAndCountAll({
            where:{
                activity_group_id:req.query.activity_group_id
            },
            offset:0,
            limit:1000
        });
        
        if (dataAll.count !== 0){
            res.json({
                "statusCode":200,
                "status":"Success",
                "total":dataAll.count,
                "limit":1000,
                "skip":0,
                "data":dataAll.rows
            })
        } else {
            res.json({
                "statusCode":200,
                "status":"Success",
                "total":dataAll.count,
                "limit":1000,
                "skip":0,
                "data":[]
            })
        }
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};

exports.detilById = async function(req,res){
    try {
        let cekData = await data.findAndCountAll({
            where:{
                id:req.params.id
            }
        })

        if (cekData.count !== 0){
            let dataAll = await data.findOne({
                where:{id:req.params.id}
            });

            res.json({
                "statusCode":200,
                "status":"Success",
                "data":{
                    "id":dataAll.id,
                    "title":dataAll.title,
                    "is_active":dataAll.is_active,
                    "priority":dataAll.priority
                }
            })
        } else {
            res.status(404).json({
                "statusCode":404,
                "status":"Not Found",
                "message":"Todo with ID "+req.params.id+" Not Found"
            })
        }
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};

exports.save = async function(req,res){
    try {
        if (req.body.title && req.body.activity_group_id){
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
            
            res.status(201).json({
                "statusCode":201,
                "status":"Success",
                "data":{
                    "id": dataAfterSave[0].id,
                    "title": dataAfterSave[0].title,
                    "activity_group_id": dataAfterSave[0].activity_group_id,
                    "is_active": dataAfterSave[0].is_active === 1 ? true : false,
                    "priority":dataAfterSave[0].priority,
                    "created_at": dataAfterSave[0].created_at,
                    "updated_at": dataAfterSave[0].updated_at
                }
            })

        } else if (req.body.activity_group_id) {
            res.status(400).json({
                "statusCode":400,
                "status":"Bad Request",
                "message":"title cannot be null"
            })

        } else {
            res.status(400).json({
                "statusCode":400,
                "status":"Bad Request",
                "message":"activity_group_id cannot be null"
            })
        }
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }

};

exports.update = async function(req,res){
    try {
        let cekData = await data.findAndCountAll({
            where:{
                id:req.params.id
            }
        })

        if (cekData.count !== 0){
            await data.update({
                title:req.body.title,
                status:req.body.status
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
                "statusCode":200,
                "status":"Success",
                "data":{
                    "id": dataAfterSave.id,
                    "title": dataAfterSave.title,
                    "activity_group_id": dataAfterSave.activity_group_id,
                    "is_active": dataAfterSave.is_active,
                    "priority":dataAfterSave.priority,
                    "created_at": dataAfterSave.created_at,
                    "updated_at": dataAfterSave.updated_at
                }
            })

        } else {
            res.status(404).json({
                "statusCode":404,
                "status":"Not Found",
                "message":"Todo with ID "+req.params.id+" Not Found"
            })
        }

    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};

exports.delete = async function(req,res){
    try {
        let cekData = await data.findAndCountAll({
            where:{
                id:req.params.id
            }
        })

        if (cekData.count !== 0){
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
        } else {
            res.status(404).json({
                "statusCode":404,
                "status": "Not Found",
                "message": "Todo with ID "+req.params.id+" Not Found"
            })
        }
        
    } catch (err) {
        res.status(500).json(response.gagal(err.message));
    }
    
};