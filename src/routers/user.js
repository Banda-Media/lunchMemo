const express = require('express')
const { User, findFromId, findAll, findFromEmail } = require('../models/user')
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
    console.log(`Getting user from param id ${_id}`)
    try {
        const user = await findFromId(_id)
        console.log(`User acquired: ${user}`)
        res.status(200).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async(req, res) => {
    console.log(`DELETE /users/${req.params.id}: ${req.body}`)
    const _id = req.params.id
    try {
        const user = findFromId(_id)
        await remove(_id)
        console.log(`Deleted user at id ${_id}`)
        res.status(200).send({ user })
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users', async(req, res) => {
    console.log(`POST /users: ${req.body}`)
    const user = new User(req.body)
    try {
        await save(user)
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    console.log(`POST /users/login: ${req.body}`)
    const _id = req.params.id
    try {
        const user = await findFromEmail(req.body.email)
        if (user.password !== req.body.password) throw 'Could not login'
        console.log(`User ${_id} logged in.`)
        res.status(200).send({ user })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout/:id', async(req, res) => {
    console.log(`POST /users/logout/${req.params.id}: ${req.body}`)
    const _id = req.params.id
    try {
        let result = await setInactive(_id)
        console.log(`User ${_id} logged out.`)
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router