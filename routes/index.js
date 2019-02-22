const express=require('express');

const router=express.Router();

const {ensureAuthenticated}=require('./../config/auth.js');



router.get('/',(req,res)=>{


    res.render('welcome');

});
// router.get('/dashboard',(req,res)=>{
//
//   res.render('dashboard');
// });

//ensureIsAuthenticated
router.get('/dashboard',ensureAuthenticated,(req,res)=>{

    res.render('dashboard',{

      name:req.user.name
    });


});


module.exports=router;
