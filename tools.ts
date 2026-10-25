import type Anthropic from '@anthropic-ai/sdk';

// Tool definitions sent to Claude with every request in this lesson.
// Provided for you — this lesson is about how a response arrives, not about
// executing tools. Neither script you write here ever runs a tool: you only
// observe the tool call the model asks for.
export const tools: Anthropic.Tool[] = [
  {
    name: 'read_file',
    description: 'Reads the contents of a text file at the given path.',
    input_schema: {
      type: 'object',
      properties: { path: { type: 'string' } },
      required: ['path'],
    },
  },
  {
    name: 'list_files',
    description:
      'Returns the list of files in the given directory (defaults to current working directory).',
    input_schema: {
      type: 'object',
      properties: { directory: { type: 'string' } },
      required: [],
    },
  },
  {
    name: 'write_file',
    description: 'Writes text content to a file at the given path.',
    input_schema: {
      type: 'object',
      properties: {
        path: { type: 'string' },
        content: { type: 'string' },
      },
      required: ['path', 'content'],
    },
  },
];
