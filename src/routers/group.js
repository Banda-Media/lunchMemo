const express = require('express')
const Group = require('../models/group')
const router = new express.Router()

router.post('/groups', async(req, res) => {
    const user = new Group(req.body)
    try {
        await group.save()
        res.status(201).send({ group })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/groups', async(req, res) => {
    try {
        console.log(Group)
            // res.status(201).send({ Group.findAll() })
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router