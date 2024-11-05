const mongoose = require('mongoose');
const RegisterSchema = mongoose.Schema(
    {
        name : { type : String, required : true},
        email : { type: String, required : true},
        password : { type : String, required : true},
        role : { type : String, required : true}
    }
);
const model = mongoose.model('UserData', RegisterSchema) 
module.exports = model