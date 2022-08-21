const express = require('express');
const path = require('path');

const {planetsRouter,usersRouter} = require('./src/routes')

const app = express();

app.set("view engine","hbs");
app.set("views",path.join(__dirname,"views"))

const PORT = 3000;

// mw signature
// app.use(req,res,next)   
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    // res.status(500).send("connection snapped!");
    // return;
    const start = Date.now();
    next();
    const end = Date.now();
    const diff = end - start;
    console.log(`time taken ${diff}ms`)
});

app.use('/site',express.static(path.join(__dirname,'public'))); // make public folder available - used for websites http://localhost:3000/site

app.use(express.json()); // This MW adds the req.body in POST as parse the request based on bodyparser

//template engine
app.get('/',(req,res)=>{
    res.render('index.hbs',{
        title:"Template Enging Example",
        caption:"Handlebar made it possible!"
    })
});

app.use('/planets',planetsRouter); // mounting router - otherwise app.use(planetsRouter) for '/planets/'
app.use('/users',usersRouter);

app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`)
})