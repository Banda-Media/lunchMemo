const express = require('express')
const { Group, findAll, save } = require('../models/group')
const router = new express.Router()

router.get('/groups', async(req, res) => {
    try {
        const groups = await findAll()
        res.status(201).send(groups)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/groups/:uid', async(req, res) => {
    try {
        const groups = await findFromId(req.params.uid)
        res.status(201).send(groups)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/groups/active', async(req, res) => {
    try {
        const groups = await findAll()
        res.status(200).send({ groups: groups.filter(g => g.active) })
    } catch (e) {
        res.status(404).send(e)
    }
})

router.post('/groups', async(req, res) => {
    const group = new Group(req.body)
    try {
        await save(group)
        res.status(201).send({ group })
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router