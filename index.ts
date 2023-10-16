import bsky from '@atproto/api';
const { BskyAgent } = bsky;
import * as dotenv from 'dotenv';

dotenv.config();
const agent = new BskyAgent({ service: 'https://bsky.social' })

await agent.login({
  identifier: process.env.BLUESKY_USERNAME!,
  password: process.env.BLUESKY_PASSWORD!,
});

// Make your api calls with the agent here. For example
// const resp = await agent.getProfile({"actor": "<your handle here>"})
