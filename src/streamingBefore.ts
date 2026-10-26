import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { tools } from './tools.js';

const client = new Anthropic();

// TODO (step 2): send the prompt with a blocking call, passing `tools`,
// and print the returned content as pretty JSON.
