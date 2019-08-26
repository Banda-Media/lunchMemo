const express = require('express')
const { User, findFromId, findAll, findFromEmail } = require('../models/user')
const router = new express.Router()

router.get('/users', async(req, res) => {
    try {
        const users = await findAll()
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/:uid', async(req, res) => {
    try {
        const user = await findFromId(req.params.uid)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await save(user)
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await findFromEmail(req.body.email)
        if (user.password !== req.body.password) throw 'Could not login'
        console.log(`User ${req.params.uid} logged in.`)
        res.status(200).send({ user })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', async(req, res) => {
    try {
        await setInactive(req.params.uid)
        console.log(`User ${req.params.uid} logged out.`)
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/me', async(req, res) => {
    try {
        await remove(req.params.uid)
        console.log(`Deleted user at id ${req.params.uid}`)
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router