
<div style="display:flex; flex-direction: column; justify-content:center; align-items: center; text-align:center;">
    <h1 style="text-align: center">LunchMemo</h1>
    <img src="https://github.com/bobbypwang/LunchMemo/blob/dev/public/img/icon/android-chrome-192x192.png?raw=true" alt="LunchMemo logo">
    <p style="font-size: 1.35rem; font-weight: 500; padding: 2rem; text-align: center"> Lunch Memo makes it easy to organize lunch with your colleagues and other professionals in your area.  Spend less time finding lunch spots and scheduling with everyone and simply your lunch life with LunchMemo.</p>
    <a href="https://heroku.com/deploy?template=https://github.com/bobbypwang/lunchmemo"><img alt="deploy" src="https://www.herokucdn.com/deploy/button.png"></a>
</div>

-------------

# Setup
### Installation
*   Clone the [repo]('https://github.com/bobbypwang/LunchMemo')
*   Install the server dependencies with: ```npm install```
*   Run the local server using ```npm run start```
*   Open ```http://localhost:3000``` and Have fun!

-------------

### Environment Variables
#### Set up API Access
*   Obtain a [Yelp API Key](https://www.yelp.com/developers/documentation/v3/authentication)
*   Create a [Mongo DB Cluster](https://cloud.mongodb.com/)  - ***NOT YET (also not yet for the key listed below)***
*   Create a [Heroku App]('https://heroku.com')
*   Set the following environment variables on | [mac](https://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion) | [windows](https://superuser.com/questions/1334129/setting-an-environment-variable-in-windows-10-gpodder) | [linux](https://stackoverflow.com/questions/45502996/how-to-set-environment-variable-in-linux-permanently) |

| Key                         | Description                                     |
| :--                         | -----------                                     |
| `PORT`                      | The local server port (default 3000)            |
| `DB_PORT`                   | The local json-server port (default 3001)       |
| `LUNCHMEMO_YELP_API_KEY`    | The generated Yelp Fusion API key you created   |
| `LUNCHMEMO_MONGODB_URL`     | The generated Mongo DB Cluster connection URI   |  

-------------

# Authors
Andres Weber
Bobby Wang