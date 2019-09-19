const express = require('express')
const Group = require('../models/Group')
const router = new express.Router()

// const auth = require('../middleware/auth')

/** 
 * Creates a new group 
 * @example
 * POST /api/groups
 */
router.post('/', async(req, res) => {
    try {
        console.log('----------------- groups router')
        const group = await Group.create({
            ...req.body,
            creator: req.user._id
        })
        res.status(201).send(group)
    } catch (e) {
        res.status(400).send(e)
    }
})

/** 
 * Gets groups relevant to req.user 
 * @example
 * GET /api/groups
 * GET /api/groups?active=true
 * GET /api/groups?limit=10&skip=20
 * GET /api/groups?sortBy=createdAt:desc
 */
router.get('/', async(req, res) => {
    const match = {}
    const sort = {}
    if (req.query.active) match.active = req.query.active === 'true'
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'groups',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.groups)
    } catch (e) {
        res.status(500).send()
    }
})

/** 
 * Gets specific group
 * @example
 * GET /api/groups/:id 
 */
router.get('/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const group = await Group.findOne({ _id, creator: req.user._id })
        if (!group) return res.status(404).send()
        res.send(group)
    } catch (e) {
        res.status(500).send()
    }
})

/**
 * Updates a specific group
 * @example
 * PATCH /api/groups/:id 
 */
router.patch('/:id', async(req, res) => {
    const updates = Object.keys(req.body)

    // const allowedUpdates = ['description', 'completed']
    // if (!updates.every((update) => allowedUpdates.includes(update))) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const group = await Group.findOne({ _id: req.params.id, creator: req.user._id })
        if (!group) return res.status(404).send()
        updates.forEach((update) => group[update] = req.body[update])
        await group.save()
        res.send(group)
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * Deletes a specific group 
 * @example
 * DELETE /api/groups/:id
 */
router.delete('/:id', async(req, res) => {
    try {
        const group = await Group.findOneAndDelete({ _id: req.params.id, creator: req.user._id })
        if (!group) res.status(404).send()
        res.send(group)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router