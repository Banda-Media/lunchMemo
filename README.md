<div align=center>
    <h1 align=center>
        <a href="https://lunchmemo.andresmweber.com/" rel="noopener noreferrer" target="_blank">
            <img 
                align=center
                src="./docs/icon/android-chrome-192x192.png"
                alt="LunchMemo logo">
        </a>
        <br>
        LunchMemo
        <br>
        <a href="https://codeclimate.com/github/Banda-Media/lunchMemo/maintainability">
            <img src="https://api.codeclimate.com/v1/badges/8ddd8f735023d01d9d59/maintainability" />
        </a>
        <a href="https://codeclimate.com/github/Banda-Media/lunchMemo/test_coverage">
            <img src="https://api.codeclimate.com/v1/badges/8ddd8f735023d01d9d59/test_coverage" />
        </a>
    </h1>
    <p style="font-size: 1.35rem; font-weight: 500; padding: 2rem; text-align: center"> Lunch Memo makes it easy to
        organize lunch with your colleagues and other professionals in your area. Spend less time finding lunch spots
        and scheduling with everyone and simply your lunch life with LunchMemo.</p>
    <br>
    <h3 align=center>Tech Stack</h4>
    <br>
    <div align=center>
        <img src="./docs/featurepeek.png" height="32">
        <img src="./docs/firebase.png" height="32">
        <img src="./docs/next.png" height="32">
        <img src="./docs/tsdx.png" height="32">
        <img src="./docs/typescript.png" height="32">
        <img src="./docs/tailwind.png" height="32">
    </div>
    <br>
    <h2 align=center><a href="https://lunch-memo.vercel.app/" rel="noopener noreferrer" target="_blank">Live Demo</a></h2>
    <br>
</div>

# Screenshots

<div align=center>
    <img src="./docs/screenshots/Home-Login.PNG" width="500">
    <img src="./docs/screenshots/Home-Register.PNG" width="500">
    <img src="./docs/screenshots/Profile-Group.PNG" width="500">
    <img src="./docs/screenshots/Profile-Group-Added.PNG" width="500">
</div>

# Setup

### Installation

#### Local Development

- Clone the [repo]('https://github.com/Banda-Media/LunchMemo')
- Install the server dependencies with: `npm install` or `yarn install`
- Run the local server using `npm run dev` or `yarn dev`
- Open `http://localhost:3000` and Have fun!

---

### Environment Variables

#### Set up API Access

- Obtain a [Yelp API Key](https://www.yelp.com/developers/documentation/v3/authentication)
- Create a [Firebase Project](https://firebase.google.com)
- (Optional): Create a [NextJS Vercel project](https://vercel.com/) and install the Github App
- (Optional): Create a [FeaturePeek project](https://featurepeek.com/) and install the Github App
- Set the following environment variables on | [mac](https://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion) | [windows](https://superuser.com/questions/1334129/setting-an-environment-variable-in-windows-10-gpodder) | [linux](https://stackoverflow.com/questions/45502996/how-to-set-environment-variable-in-linux-permanently) |
- Copy `.env example` and set entries for environment config
- | Key                                           | Description                                         |
  | :-------------------------------------------- | --------------------------------------------------- |
  | `NEXT_PUBLIC_LM_YELP_API_KEY`                 | The generated Yelp Fusion API key you created       |
  | `NEXT_PUBLIC_LM_FIREBASE_API_KEY`             | Firebase API Key                                    |
  | `NEXT_PUBLIC_LM_FIREBASE_AUTH_DOMAIN`         | Firebase Project Config Var                         |
  | `NEXT_PUBLIC_LM_FIREBASE_PROJECT_ID`          | Firebase Project Config Var                         |
  | `NEXT_PUBLIC_LM_FIREBASE_DATABASE_URL`        | Firebase Project Config Var                         |
  | `NEXT_PUBLIC_LM_FIREBASE_STORAGE_BUCKET`      | Firebase Project Config Var                         |
  | `NEXT_PUBLIC_LM_FIREBASE_MESSAGING_SENDER_ID` | Firebase Project Config Var                         |
  | `NEXT_PUBLIC_LM_FIREBASE_APP_ID`              | Firebase Project Config Var                         |
  | `NEXT_PUBLIC_LM_FIREBASE_MEASUREMENT_ID`      | Firebase Project Config Var                         |
  | `NEXT_PUBLIC_LM_FIREBASE_CLIENT_EMAIL`        | Firebase Admin Project Config Var                   |
  | `NEXT_PUBLIC_LM_FIREBASE_PRIVATE_KEY`         | Firebase Admin Project Config Var                   |
  | `NEXT_PUBLIC_LM_SECURE_COOKIE`                | LunchMemo auth config (boolean, should be false)    |
  | `DEBUG`                                       | (Optional) Debugger filter, default is lunchmemo:\* |

---

# Authors

<ul style="list-style-type: none; margin: 0; padding: 0;">
    <li>
        <a href="https://github.com/andresmweber/">
            <img title="Andres Weber" src="https://github.com/andresmweber.png" height="50px">
        </a>
    </li>
    <li>
        <a href="https://github.com/bobbypwang/">
            <img title="Bobby Wang" src="https://github.com/bobbypwang.png" height="50px">
        </a>
    </li>
</ul>
