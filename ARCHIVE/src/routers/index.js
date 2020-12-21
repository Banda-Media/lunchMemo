const express = require('express');
const router = express.Router();
const path = require('path');

const publicDirectoryPath = path.join(__dirname, '../../public');

router.get('/', async (req, res) => {
  try {
    // console.log('Rendering public index...')
    // res.sendFile(publicDirectoryPath + '/index.html');
    console.log('Running the index ------------------');
    res.render('index');
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
