## Step 3: Predict the stream

You've seen the finished message. Now: what happens on the way there?

### 📖 Theory: streaming

With `stream: true`, the API sends the response as a sequence of
[server-sent events](https://docs.claude.com/en/docs/build-with-claude/streaming)
while the model is still generating it: a message starts, content blocks
start, receive **deltas**, and stop, and the message ends. The TypeScript
SDK wraps this in `client.messages.stream()`, which lets you listen to
events as they happen and still gives you the assembled message at the end
with `finalMessage()`.

Text arrives as text deltas. Tool calls are less obvious — that is what you
are about to predict.

### ⌨️ Activity: write your second hypothesis

1. Read the streaming docs linked above — the event types, not code samples.
1. In `NOTEBOOK.md`, under **2. Hypothesis: streaming `messages.stream()`**,
   predict for the same request:
   - what you'll see in the terminal, and when,
   - in what order the events arrive,
   - how the `tool_use` block's JSON arguments reach you,
   - whether the final assembled message differs from `runs/before.txt`.

   At least 20 words.

1. Commit and push `NOTEBOOK.md`.

<details>
<summary>Having trouble? 🤷</summary><br/>

- Keep the heading `## 2. Hypothesis: ...` unchanged.
- Don't edit section 1 to match what you saw in step 2 — a corrected
  hypothesis is no longer a hypothesis. Put that in your conclusions later.

</details>
