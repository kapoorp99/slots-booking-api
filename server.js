const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 9000;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true, 
    poolSize: 1,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 40000,
    family: 4
  };

app.use(express.json());
app.use(cors());
app.options('*',cors());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
});

const connection_url = require('./config/database.js');
mongoose.Promise = global.Promise;
mongoose.connect(connection_url.url, options).then(() => {
    console.log('Connected to database successfully');
})
.catch(error => console.error('Could not connect to database', error));



const productsRoute = require('./routes/forum');


// Routes
app.get(`/`, (req,res) => {
    res.status(200).send("Slots Booking API")
})
app.use(`/api/forums`, productsRoute)

app.listen(port,()=>console.log(`App listening on port ${port}`));