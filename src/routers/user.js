const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/User')
// const auth = require('../middleware/auth')

const router = new express.Router()

/** 
 * Creates a new user 
 * @example
 * POST /api/user
 */
router.post('/', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

/** 
 * Obtains a copy of the current logged in user model
 * @example
 * GET /api/user/me 
 */
router.get(`/me`, async(req, res) => {
    res.json({ user: req.user || 'not logged in' })
})

/** 
 * Edits fields of the currently logged in user
 * @example
 * PATCH /api/user/me 
 */
router.patch(`/me`, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/** 
 * Deletes the currently logged in user
 * @example
 * DELETE /api/user/me 
 */
router.delete(`/me`, async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

/** 
 * Uploads an avatar file
 */
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

/** 
 * Upload an avatar and save to the user document
 * @example
 * POST /api/user/me/avatar "avatar.jpg"
 */
router.post(`/me/avatar`, upload.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

/** 
 * Delete the current user's avatar
 * @example
 * DELETE /api/user/me/avatar
 */
router.delete(`/me/avatar`, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

/** 
 * Get a user's avatar and send back the image
 * @example
 * GET /api/user/:id/avatar 
 */
router.get(`/:id/avatar`, async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) throw new Error()
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router