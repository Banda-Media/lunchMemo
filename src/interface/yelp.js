'use strict';

/**
 * A Yelp Fusion restaurant model
 * @typedef {Object} restaurant
 * @property {string} id - hash id used by yelp
 * @property {string} alias - the name alias
 * @property {string} name - the name alias
 * @property {string} image_url
 * @property {boolean} is_closed
 * @property {string} url
 * @property {number} review_count
 * @property {string[]} categories - Array of categories this restaurants falls under
 * @property {number} rating
 * @property {latitude: number, longitude: number} coordinates 
 * @property {string[]} transactions
 * @property {string} price - Price rating out of 5 $
 * @property {string[]} location - location with all corresponding address fields.
 * @property {string} phone: 10 digit phone number
 * @property {string} display_phone: localized phone number with extra symbols
 * @property {number} distance: in feet?
 * @example
 * { id: 'DZz0uVWzsJiWIHqPmgxHVw',
 alias: 'city-of-saints-coffee-roasters-new-york',
 name: 'City of Saints Coffee Roasters',
 image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/vkqqgeW5Lec0CV9qynnNqA/o.jpg',
 is_closed: false,
 url: 'https://www.yelp.com/biz/city-of-saints-coffee-roasters-new-york?adjust_creative=Se9ldeHQQ-Anj66hpYuRmg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Se9ldeHQQ-Anj66hpYuRmg',
 review_count: 192,
 categories: [ [Object] ],
 rating: 4.5,
 coordinates: { latitude: 40.7311385, longitude: -73.9900766 },
 transactions: [],
 price: '$$',
 location:
  { address1: '79 E 10th St',
    address2: '',
    address3: '',
    city: 'New York',
    zip_code: '10003',
    country: 'US',
    state: 'NY',
    display_address: [Array] },
 phone: '+16465901624',
 display_phone: '(646) 590-1624',
 distance: 2879.014831921163 }
 */

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