const express = require('express')
const router = new express.Router()
const path = require('path')

const publicDirectoryPath = path.join(__dirname, '../../public');

router.get('/', async(req, res) => {
    try {
        console.log('Rendering...')
        res.sendFile(publicDirectoryPath + '/index.html');
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router