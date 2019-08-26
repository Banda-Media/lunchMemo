const express = require('express')
const { User, findAll } = require('../models/user')
const router = new express.Router()

router.get('/users', async(req, res) => {
    try {
        res.status(201).send(findAll())
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.find(req.body.email)
        if (user.password !== req.body.password) throw 'Could not login'
        res.send({ user })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', async(req, res) => {
    try {
        await req.user.setInactive()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/me', async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router