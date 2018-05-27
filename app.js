const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev')); //loging 

const bodyParser = require("body-parser");

const mongoose = require("mongoose");


mongoose.connect(
  "mongodb://angupta:Password123@cluster0-shard-00-00-vgh2g.mongodb.net:27017,cluster0-shard-00-01-vgh2g.mongodb.net:27017,cluster0-shard-00-02-vgh2g.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
).then(result => {
      console.log(result);
  })
.catch(err => {
      console.log(err);
  });

const productRoutes = require('./api/routes/product');

app.use(bodyParser.urlencoded({ extended: true }));   //bodyparser mean passing paramerter and header 
app.use(bodyParser.json());





app.use((req, res, next) => {                              // to protect from cors requasts
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/porducts', productRoutes);

app.use((req, res, next) => {                         //if other route then oders then say not found
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {                // if any errror occures i.e code breakas then send proper error message  
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;