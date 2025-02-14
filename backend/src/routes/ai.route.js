const express = require('express')
const router = express.Router()
const generateContent = require('../services/ai.service')

router.post("/code-review", async (req,res)=>{
    try {
        const { code } = req.body;
        console.log(req.body)
        if(!code){
            return res.status(400).send("please enter the code");
        }
        const aiResponse = await generateContent(code)
        res.send(aiResponse);   
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;