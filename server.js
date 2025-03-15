const express = require('express');
const mongodb = require('./data/database');
const app = express();
const bodyParser = require('body-parser')



const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, x-Requested-with, Content-Type, Accept, z-Key'
 );
    res.setHeader('Acess-Control-Allow-Mettods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
 app.use('/', require('./routes'));
 

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
        
    }else
    app.listen(port,() => {console.log(`Database is Listining and node is Running on port ${port}`)});

});



