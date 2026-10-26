## Step 4: The streaming call

Same request as step 2, observed as it is generated.

### 📖 Theory: listening to the stream

`client.messages.stream()` returns a stream object you subscribe to:

- `text` — fires with each piece of text as it arrives,
- `streamEvent` — fires with every raw event; tool arguments come as
  `content_block_delta` events whose `delta.type` is `input_json_delta`,
  carrying a `partial_json` string,
- `finalMessage()` — resolves to the complete, assembled `Message`.

See [Streaming messages](https://docs.claude.com/en/docs/build-with-claude/streaming).

### ⌨️ Activity: complete `streamingAfter.ts`

1. Open `streamingAfter.ts` and replace the `TODO`. Same model, tools and
   prompt as step 2, but using `client.messages.stream()`. The script
   should:
   - write each text delta to stdout as it arrives (without a newline after
     each one, so you see it flow),
   - for every `input_json_delta`, print **one line** in exactly this
     format:

     ```
     [fragment] <partial_json>
     ```

   - after `finalMessage()` resolves, find the `tool_use` block and print
     its input as **one line** in exactly this format:

     ```
     [final] <JSON.stringify of the tool_use input>
     ```

   The exact line formats matter: the check glues every `[fragment]` back
   together, parses it, and compares it with your `[final]` line.

1. Run it and save the output:

   ```bash
   pnpm run after | tee runs/after.txt
   ```

1. Commit and push both files:

   ```bash
   git add streamingAfter.ts runs/after.txt
   git commit -m "Step 4: streaming call"
   git push
   ```

<details>
<summary>Having trouble? 🤷</summary><br/>

- **Only one fragment, or none?** Make sure you're filtering raw events for
  `content_block_delta` with `delta.type === 'input_json_delta'`, and that
  the model actually called `read_file` (check `runs/after.txt` for text
  only).
- **"fragments_assemble" fails?** Print each fragment exactly as received —
  don't trim it or add quotes. Start every fragment line on a new line,
  even if a text delta was printed just before it.
- **Still stuck?** Ask Copilot for a hint, or compare with the reference in
  [agents-the-hard-way-solutions](https://github.com/agents-the-hard-way/agents-the-hard-way-solutions/tree/main/lessons/01-streaming)
  — after you've tried.

</details>
