const express = require('express')
const { findFromId, findAll, save, remove, update, setInactive, setActive } = require('../models/group')
const router = new express.Router()
const GROUP_BASE_ROUTE = '/groups'

router.get(GROUP_BASE_ROUTE, async(req, res) => {
    try {
        const groups = await findAll()
        res.status(201).send(groups)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get(`${GROUP_BASE_ROUTE}/:id`, async(req, res) => {
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

router.patch(GROUP_BASE_ROUTE, async(req, res) => {
    console.log(`PATCH /groups: ${req.body.group}`)
    try {
        const group = await update(req.body.group)
        res.status(200).send(group.data)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get(`/active${GROUP_BASE_ROUTE}`, async(req, res) => {
    console.log(`GET /active/groups`)
    try {
        const groups = await findAll()
        res.status(200).send({ groups: groups.filter(g => g.active) })
    } catch (e) {
        res.status(404).send(e)
    }
})

router.post(`${GROUP_BASE_ROUTE}`, async(req, res) => {
    console.log(`POST /groups: ${JSON.stringify(req.body)}`)
    try {
        let group = req.body

        let requiredFields = ['name', 'startTime', 'endTime']
        requiredFields.map(field => (group[field] === undefined || group[field] === "") && new Error(`Must enter group.${field}`))

        const groups = await findAll()
        groups.map(existingGroup => existingGroup.name == group.name)

        group.active = true
        group.users = group.users || []
        await save(group)
        res.status(201).send({ group })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete(`${GROUP_BASE_ROUTE}/:id`, async(req, res) => {
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