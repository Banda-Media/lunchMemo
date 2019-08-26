const express = require('express')
const { findFromId, findAll, findFromEmail, save, remove, setInactive, setActive } = require('../models/user')

const router = new express.Router()

router.get('/users', async(req, res) => {
    console.log(`GET /users: ${req.body}`)
    try {
        const users = await findAll()
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/:id', async(req, res) => {
    console.log(`GET /users/${req.params.id}: ${req.body}`)
    const _id = req.params.id
    try {
        const user = await findFromId(_id)
        res.status(200).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async(req, res) => {
    console.log(`DELETE /users/${req.params.id}: ${req.body}`)
    const _id = req.params.id
    try {
        const user = await findFromId(_id)
        await remove(_id)
        res.status(200).send({ user })
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/users', async(req, res) => {
    console.log(`POST /users: ${JSON.stringify(req.body)}`)
    try {
        await save(req.body)
        res.status(201).send({ user: req.body })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    console.log(`POST /users/login: ${JSON.stringify(req.body)}`)
    try {
        let user = await findFromEmail(req.body.email)
        if (user.password !== req.body.password) throw 'Could not login'
        await setActive(user.id)
        console.log(`User ${user.id} logged in.`)
        res.status(200).send({ user: await findFromId(user.id) })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/logout/:id', async(req, res) => {
    console.log(`POST /users/logout/${req.params.id}`)
    const _id = req.params.id
    try {
        await setInactive(_id)
        console.log(`User ${_id} logged out.`)
        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router