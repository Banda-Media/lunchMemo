'use strict';
 
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.LUNCHMEMO_YELP_API_KEY);
 
client.search({
  term: 'Four Barrel Coffee',
  location: 'san francisco, ca',
}).then(response => {
  console.log(response.jsonBody.businesses[0]);
}).catch(e => {
  console.log(e);
});