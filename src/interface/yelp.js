'use strict';
/**
 * Singleton Interface for the Yelp Fusion API.  Must 
 * MUST have defined your API Key for process.env as LUNCHMEMO_YELP_API_KEY
 * @example 
 * var yelpAPI = YelpAPI.getInstance();
 * yelpAPI.search('coffee', 'new york, ny') // Returns a Promise.
 */
var YelpAPI = (function() {
    var instance;

    function createInstance() {
        const yelp = require('yelp-fusion');
        const client = yelp.client(process.env.LUNCHMEMO_YELP_API_KEY);
        var object = {
            api: yelp,
            client: client,
            search: async function(searchTerms, location) {
                return await this.client.search({
                        term: searchTerms,
                        location: location
                    })
                    .then(res => { return res.jsonBody.businesses })
                    .catch(e => {
                        console.log(e)
                        return e
                    })
            }

        }

        return object;
    };

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = { YelpAPI }