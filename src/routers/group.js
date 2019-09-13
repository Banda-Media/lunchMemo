const express = require('express')
const Group = require('../models/group')
const auth = require('../middleware/auth')
const router = new express.Router()


const GROUP_BASE_ROUTE = '/api/groups'

// GET /api/groups?completed=true
// GET /api/groups?limit=10&skip=20
// GET /api/groups?sortBy=createdAt:desc
router.get(GROUP_BASE_ROUTE, auth, async(req, res) => {
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

router.get(`/api/active/groups`, async(req, res) => {
    const _id = req.params.id

    try {
        const groups = await Group.find({})

        if (!groups) {
            return res.status(404).send()
        }

        res.send(groups.filter(group => group.active))
    } catch (e) {
        res.status(500).send()
    }
})

router.get(`${GROUP_BASE_ROUTE}/:id`, async(req, res) => {
    const _id = req.params.id

    try {
        const group = await Group.findOne({ _id, owner: req.user._id })

        if (!group) {
            return res.status(404).send()
        }

        res.send(group)
    } catch (e) {
        res.status(500).send()
    }
})

router.post(GROUP_BASE_ROUTE, auth, async(req, res) => {
    const group = new Group({
        ...req.body,
        owner: req.user._id
    })

    try {
        await group.save()
        res.status(201).send(group)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch(`${GROUP_BASE_ROUTE}/:id`, auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const group = await Group.findOne({ _id: req.params.id, owner: req.user._id })

        if (!group) {
            return res.status(404).send()
        }

        updates.forEach((update) => group[update] = req.body[update])
        await group.save()
        res.send(group)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete(`${GROUP_BASE_ROUTE}/:id`, auth, async(req, res) => {
    try {
        const group = await Group.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!group) {
            res.status(404).send()
        }

        res.send(group)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router