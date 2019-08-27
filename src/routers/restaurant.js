const express = require('express')
const { YelpAPI } = require('../interface/yelp')
const router = new express.Router()

/**
 * Route for handling yelp API searching for nearby restaurants
 * MUST have defined your API Key for process.env as LUNCHMEMO_YELP_API_KEY
 * @param {string} searchTerm - The type of restaurant you're looking for
 * @param {string} location - The location to query (can be comma separated or just one name as you'd type into yelp) 
 * @returns {object[]} - An array of yelp restaurant objects.
 */
router.post('/API/search/restaurants', async(req, res) => {
    try {
        console.log(`POST /API/search/restaurants searchTerms: ${req.body.searchTerms}, locations: ${req.body.location}`)
        let yelpRestaurants = await YelpAPI.getInstance().search(req.body.searchTerms, req.body.location)
        res.status(201).send({ yelpRestaurants })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router