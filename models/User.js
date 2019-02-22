const mongoose=require('mongoose');

var userSchema= new mongoose.Schema({

                 name:{

                   type:String,
                   required:true,
                   minLength:3
                 },

                 email:{

                   type:String,
                   required:true,
                   minLength:3
                 },

                 password:{

                   type:String,
                   required:true,
                   minLength:3
                 },
                 date: {
                   type: Date,
                   default: Date.now
                 }




});


const User=mongoose.model('User',userSchema);

module.exports=User;
