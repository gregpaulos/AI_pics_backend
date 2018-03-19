const express = require('express')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
require('dotenv').config()

// const apis = require("./routes/apis")

const app = express()
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());




app.get('/', (req, res) => {
    const greeting = "index says hello!"
    res.json(greeting)
})

// app.use('/apis', apis)

app.listen(port, () => console.log('Example app listening on port '+ port))


module.exports = app;