const express = require('express')
const { findFromId, findAll, findFromEmail, update, save, remove, setInactive, setActive } = require('../models/user')
const router = new express.Router()
const USER_BASE_ROUTE = '/api/users'

router.get(USER_BASE_ROUTE, async(req, res) => {
    console.log(`${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`)
    try {
        const users = await findAll()
        res.status(200).send(users)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.patch(USER_BASE_ROUTE, async(req, res) => {
    console.log(`${req.method} ${req.path}: ${JSON.stringify(req.body)}`)
    try {
        const user = await update(req.body.user)
        res.status(200).send(user.data)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get(`${USER_BASE_ROUTE}/:id`, async(req, res) => {
    console.log(`${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`)
    const _id = req.params.id
    try {
        const user = await findFromId(_id)
        res.status(200).send({ user })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete(`${USER_BASE_ROUTE}/:id`, async(req, res) => {
    console.log(`${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`)
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

router.post(USER_BASE_ROUTE, async(req, res) => {
    console.log(`${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`)
    try {
        await save(req.body)
        res.status(201).send({ user: req.body })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post(`/login`, async(req, res) => {
    console.log(`${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`)
    try {
        let user = await findFromEmail(req.body.email)
        if (user.password !== req.body.password) throw 'Could not login'
        await setActive(user.id)
        console.log(`User ${user.id} logged in.`)
        user = await findFromId(user.id)
        delete user.password
        res.status(200).send({ user })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post(`/logout`, async(req, res) => {
    console.log(`${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`)
    try {
        await setInactive(req.body.user.id)
        console.log(`User ${req.body.user} logged out.`)
        res.status(200).send(req.body.user)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router