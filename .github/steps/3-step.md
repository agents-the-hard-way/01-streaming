## Step 3: Predict the stream

`messages.stream()` sends the same request, but the response arrives as
[server-sent events](https://docs.claude.com/en/docs/build-with-claude/streaming)
while the model is still generating it.

Read `src/streamingAfter.ts`: same request, now streamed.

1. In `NOTEBOOK.md`, under **2. Hypothesis**, write what you expect: what
   appears in the terminal and when, and how the tool call's JSON arguments
   reach you. At least 20 words.

1. Commit and push `NOTEBOOK.md`.
