const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//User Model
const Waiter = require('../models/waiter');

//Get all
router.get('/', (req, res, next) => {
    Waiter.find()
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
    const newWaiter = new Waiter({
        _id : new mongoose.Types.ObjectId(),
        userId : req.body.userId,
        password : req.body.password,
        badgeId : req.body.badgeId,
        nick : req.body.nick,
        fullName : req.body.fullName
    });

    newWaiter.save()
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
    Waiter.findById(id)
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
    // console.log('---req.body---')
    // console.log(req.body);
    // console.log('---updateOps---')
    // console.log(updateOps);
    // console.log('-------')
    Waiter.update({ _id : id }, { $set: req.body })
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
    Waiter.remove({ _id : id })
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