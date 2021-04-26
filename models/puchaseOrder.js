'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PuchaseOrderSchema = Schema({
   
    amount: Number,
    price: Number,
    name : String,
    user:{type: Schema.Types.ObjectId, ref:"user"},
    isConfirmed:{type: Boolean, default: false},
    isRecieve:{type: Boolean, default: false}
    
});

module.exports = mongoose.model('puchaseorder', PuchaseOrderSchema);