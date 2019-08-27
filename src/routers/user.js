const express = require('express')
const { findFromId, findAll, findFromEmail, save, remove, setInactive, setActive } = require('../models/user')
const router = new express.Router()
const BASE_URL = '/users'

router.get(BASE_URL, async(req, res) => {
    console.log(`GET /users: ${req.body}`)
    try {
        const users = await findAll()
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get(`${BASE_URL}/:id`, async(req, res) => {
    console.log(`GET /users/${req.params.id}: ${req.body}`)
    const _id = req.params.id
    try {
        const user = await findFromId(_id)
        res.status(200).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete(`${BASE_URL}/:id`, async(req, res) => {
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

router.post(BASE_URL, async(req, res) => {
    console.log(`POST /users: ${JSON.stringify(req.body)}`)
    try {
        await save(req.body)
        res.status(201).send({ user: req.body })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post(`/login`, async(req, res) => {
    console.log(`POST /users/login: ${JSON.stringify(req.body.user)}`)
    try {
        let user = await findFromEmail(req.body.email)
        if (user.password !== req.body.password) throw 'Could not login'
        await setActive(user.id)
        console.log(`User ${user.id} logged in.`)
        let x = await findFromId(user.id)
        console.log(x)
        res.status(200).send({ user:  x.data})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post(`/logout`, async(req, res) => {
    console.log(`POST /users/logout ${req.body.user}`)
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