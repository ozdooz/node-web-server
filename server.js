const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('There was an error writing out to server.log')
        }
    })
    console.log(log);
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Under Maintenance'
//     })   
// })

app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.get('/',(req, res) => {
 res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Oz\'s Home page',
 }); 
})

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'bad link'
    })   
})
app.listen(3000, () => {
    console.log('Server is up on port: 3000')
} );