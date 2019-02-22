const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const app=express();
const mongoose=require('mongoose');
const session=require('express-session');
const  flash=require('connect-flash');
const passport=require('passport');
require('./config/passport')(passport);
//Connect to MongoDB
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db,  { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));



app.use(expressLayouts); //app.engine('ejs',expressLayouts);
app.set('view engine','ejs');


app.use(express.urlencoded({extended:true}));


app.use( session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error=req.flash('error');
  next();
});


//


app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{


      console.log(`Server is up on port : ${port}`);

});
