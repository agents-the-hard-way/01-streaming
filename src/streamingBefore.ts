import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { request } from './request.js';

const client = new Anthropic();

async function send(): Promise<Anthropic.Message | undefined> {
  // ✏️ TODO: replace `undefined` with a blocking call that sends `request`.
  return undefined;
}

const message = await send();
if (!message) throw new Error('The TODO in src/streamingBefore.ts is still open.');

console.log(JSON.stringify(message.content, null, 2));
