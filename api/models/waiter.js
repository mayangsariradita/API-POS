const mongoose = require('mongoose');

const waiterSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId : { type: String, required: true },
    password : { type: String, required: true },
    badgeId : { type: String, required: true },
    nick : { type: String, required: true },
    fullName : { type: String, required: true }
});

module.exports = mongoose.model('Waiter', waiterSchema, 'waiters');