const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port  = process.env.PORT || 3000;
hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine','hbs');
// app.use((req,res) => {
//     res.render('maintainance.hbs',{
//         pageTitle : 'Maintainance'
//     })
// })
let logger = (req,res,next)=> {
    fs.appendFileSync('ServerLog.txt',`${new Date().toString()} ${req.method} ${req.url} \n`);
    next();
}

app.use(logger);


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('GetCurrentyear', ()=> {
    return new Date().getFullYear()
})

hbs.registerHelper('ScreamIt',(text)=> {
        return text.toUpperCase();
})
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        welcome : 'Welcome to Express Coffee' ,
        pageTitle : 'ExpressCoffee' ,
        
    })
}) ; 

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'About Page',
       
    });
})


app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
});