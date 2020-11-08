const express = require('express')
const router = new express.Router()

router.post('/room', async (req, res) => {
    const newRoom = req.body;

    console.log(newRoom)
})

module.exports = router