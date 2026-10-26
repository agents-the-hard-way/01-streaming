import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import type { MessageStream } from '@anthropic-ai/sdk/lib/MessageStream';
import { printFinalToolInput, printFragment, printText } from './print.js';
import { request } from './request.js';

const client = new Anthropic();

function startStream(): MessageStream | undefined {
  // ✏️ TODO 1: replace `undefined` with a call that sends the same `request`
  // as a stream.
  return undefined;
}

const stream = startStream();
if (!stream) throw new Error('TODO 1 in src/streamingAfter.ts is still open.');

stream.on('text', printText);

stream.on('streamEvent', (event) => {
  // ✏️ TODO 2: when `event` carries a piece of the tool call's JSON
  // arguments, pass that piece to printFragment().
});

printFinalToolInput(await stream.finalMessage());
