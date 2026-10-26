import type Anthropic from '@anthropic-ai/sdk';
import { tools } from './tools.js';

// The one request this lesson sends — twice, once blocking and once streamed.
// Provided for you: the lesson is about how the response arrives, not about
// building the request.
export const request: Anthropic.MessageCreateParamsNonStreaming = {
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 1024,
  tools,
  messages: [
    {
      role: 'user',
      content:
        "First say one sentence about what you're about to do, then read the file at path sandbox/notes.txt.",
    },
  ],
};
