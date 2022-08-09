const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT
const url = process.env.APP_URL
const routes = require('./routes');
const connections = require('./config/connDB');
const cors = require('cors')
const compression = require('compression')

app.use(compression())
app.use(express.json());

app.use(cors());
app.use(routes);

app.use(function (req, res, next) {
    res.status(404).json({'statusCode':404,'message':'HTTP not found'})
})

app.listen(port,()=>{
    console.log(`API Activity di ${url}:${port}`)
})