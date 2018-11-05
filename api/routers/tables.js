const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//User Model
const Table = require('../models/table');

//Get all
router.get('/', (req, res, next) => {
    Table.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
});


//Insert
router.post('/', (req, res, next) => {
    const newTable = new Table({
        _id : new mongoose.Types.ObjectId(),
        code : req.body.code,
        seat : req.body.seat,
        description : req.body.description
        });

        newTable.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
});

//Get by (id)
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Table.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    // const updateOps = {};
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // }

    Table.update({ _id : id }, { $set: req.body })
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message : err
            });
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Table.remove({ _id : id })
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message : err
            });
        });
});

module.exports = router;