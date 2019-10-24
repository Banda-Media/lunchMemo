const express = require('express')
const Group = require('../models/group')
const router = new express.Router()
    // const auth = require('../middleware/auth')

/** 
 * Creates a new group 
 * @example
 * POST /api/groups
 */
router.post('/', async(req, res) => {
    try {
        const groupData = {
            active: req.body.active,
            creator: req.body.creator,
            endTime: req.body.endTime,
            groupSize: req.body.groupSize,
            name: req.body.name,
            startTime: req.body.startTime,
            users: req.body.users
        }
        const group = await new Group(groupData)
        await group.save()
        res.status(201).json(group)
    } catch (e) {
        console.log(e)
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
    const limit = req.query.limit || 50
    const skip = req.query.skip || 0

    try {
        const groups = await Group
            .find(match)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .populate('users creator')
        res.send(groups)
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
        const group = await Group
            .findById(_id)
            .populate('users creator')
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
    const _id = req.params.id
    try {
        const group = await Group.findById(_id)
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