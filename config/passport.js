const mongoose=require('mongoose');
const localStrategy=require('passport-local').Strategy;
const User=require('./../models/User.js');
const bcrypt=require('bcryptjs');

module.exports=(passport)=>{

       passport.use(
         new localStrategy({usernameField:'email'},(email,password,done)=>{

           User.findOne({email:email}).then((user)=>{
                     if(!user)
                     {
                    return  done(null,false,{message:"That email id doesn't exist"});
                     }

                       bcrypt.compare(password,user.password,(err,isMatch)=>{

                         if(err)
                         {
                           throw err;
                         }
                         if(isMatch)
                         {
                           return done(null,user);
                         }
                         else {
                           return done(null,false,{message:"Password is incorect"});
                         }

                     })

           }).catch(err=>console.log(err));

         })
       );

         passport.serializeUser(function(user, done) {
           done(null, user.id);
         });

         passport.deserializeUser(function(id, done) {
           User.findById(id, function(err, user) {
             done(err, user);
           });
         });
  }
