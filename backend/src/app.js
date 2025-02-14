const express = require('express');
const app = express() //creates server 
const aiRoute = require('./routes/ai.route')
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use('/ai',aiRoute); // /ai/code-review

app.get("/",(req,res)=>{
    res.send("hey")
})



module.exports = app;