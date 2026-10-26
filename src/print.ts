import type Anthropic from '@anthropic-ai/sdk';

// Output helpers for streamingAfter.ts. Provided for you: they print the
// exact line formats the exercise checks, so you don't have to.

let midLine = false;

function endLine() {
  if (midLine) process.stdout.write('\n');
  midLine = false;
}

/** Prints a piece of streamed text as it arrives, without a newline. */
export function printText(text: string) {
  process.stdout.write(text);
  midLine = !text.endsWith('\n');
}

/** Prints one piece of a tool call's JSON arguments on its own line. */
export function printFragment(partialJson: string) {
  endLine();
  console.log(`[fragment] ${partialJson}`);
}

/** Prints the input of the finished message's tool call on its own line. */
export function printFinalToolInput(message: Anthropic.Message) {
  endLine();
  const toolUse = message.content.find((block) => block.type === 'tool_use');
  console.log(`[final] ${JSON.stringify(toolUse?.input ?? null)}`);
}
