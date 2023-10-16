# bluesky-chatbot-tutorial

## Quickstart

This requires Node.js 18 or above. Create a .env from the .env.template and fill it with your login information. Then run the following command to setup the developer environment:

```
npm install
```

All changes should be made in the index.ts which will then compile into a index.js which can be run
```
npx tsc
node index.js
```
## Complete install and run instructions
These are the steps I run in the Youtube Video. To setup a working project from scratch (delete all files except for this README file and the .gitignore) do the following:

1. Make sure you have Node 18 or above installed. If you don't install using
- https://nodejs.org/en 
- https://github.com/nvm-sh/nvm#installing-and-updating

2. Install a package.json config
```
npm init -y
```
3. Change the package.json config to run your script as a module by adding the following line
```
{
    "type":"module",
    ...
}
```

4. Then use npm to install the following packages
```
npm install dotenv @atproto/api && npm install typescript @types/node --save-dev
```

5. Create an empty index.ts file. We will be writing here shortly, but the next command prefers there to be an existing .ts file or else it will show a warning.

```
touch index.ts
```

6. Create a tsconfig
```
npx tsc --init
```

7. Adjust the following values in the tsconfig.json
```
{
    ...
    "target": "esnext", 
    "module": "Nodenext",
    "moduleResolution": "nodenext", 
    ...
}
```
8. Create a .env with the following information set
```
BLUESKY_USERNAME=
BLUESKY_PASSWORD=
```

9. Add the following code to login to the Bluesky API

```javascript
import bsky from '@atproto/api';
const { BskyAgent } = bsky;
import * as dotenv from 'dotenv';

dotenv.config();
const agent = new BskyAgent({ service: 'https://bsky.social' })

await agent.login({
  identifier: process.env.BLUESKY_USERNAME!,
  password: process.env.BLUESKY_PASSWORD!,
});
```

9. To run the code you must compile into a .js file which you can do by running `npx tsc`. Then you can run your file using node. This whole proccess looks like
```
npx tsc
node index.js
```

10. Run the lexicons [here](https://github.com/bluesky-social/atproto/tree/main/lexicons/app/bsky) as function calls to interact with the Bluesky API. 

For example [getProfile](https://github.com/bluesky-social/atproto/blob/main/lexicons/app/bsky/actor/getProfile.json)

```
const response = await agent.getProfile({"actor":"thinja.bsky.social"})
console.log(response)
```

11. (Optional) This is the code I run in the video in order to generate an emoji based on the percent of the year complete and write that as a post in bsky
```
function getYearProgressEmoji() {
    const currentDate = new Date();
    const dayOfYear = Math.floor((Number(currentDate) - Number(new Date(currentDate.getFullYear(), 0, 1))) / (1000 * 60 * 60 * 24));
    const percentageDone = dayOfYear / 365;

    const greenCircles = Math.round(percentageDone * 10);
    const greyCircles = 10 - greenCircles;

    return '🟢'.repeat(greenCircles) + '⚪'.repeat(greyCircles);
}

agent.post({"text": getMonthProgressEmoji()});
```
