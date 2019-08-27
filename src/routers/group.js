const express = require('express')
const { findFromId, findAll, save, remove, setInactive, setActive } = require('../models/group')
const router = new express.Router()
const BASE_URL = '/groups'

router.get(BASE_URL, async(req, res) => {
    try {
        const groups = await findAll()
        res.status(201).send(groups)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get(`${BASE_URL}/:id`, async(req, res) => {
    console.log(`GET /groups/${req.params.id}: ${req.body}`)
    const _id = req.params.id
    try {
        const group = await findFromId(_id)
        res.status(200).send({ group })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get(`/active${BASE_URL}`, async(req, res) => {
    console.log(`GET /active/groups`)
    try {
        const groups = await findAll()
        res.status(200).send({ groups: groups.filter(g => g.active) })
    } catch (e) {
        res.status(404).send(e)
    }
})

router.post(`${BASE_URL}`, async(req, res) => {
    console.log(`POST /groups: ${JSON.stringify(req.body)}`)
    try {
        req.body.active = true
        await save(req.body)
        res.status(201).send({ group: req.body })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete(`${BASE_URL}/:id`, async(req, res) => {
    console.log(`DELETE /groups/${req.params.id}: ${req.body}`)
    const _id = req.params.id
    try {
        const group = await findFromId(_id)
        await remove(_id)
        res.status(200).send({ group })
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router