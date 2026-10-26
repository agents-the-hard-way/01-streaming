import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { tools } from './tools.js';

const client = new Anthropic();

// TODO (step 4): send the same request as a stream and print what arrives,
// using the [fragment] and [final] line formats from the step instructions.
