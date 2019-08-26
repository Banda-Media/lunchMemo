const express = require('express')
const Restaurant = require('../models/restaurant')
const router = new express.Router()

router.post('/restaurants', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router