'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
   
    name : String,
    last_name : String,
    isProvider : Boolean,
    isManager : Boolean,
    
});

module.exports = mongoose.model('user', UserSchema);