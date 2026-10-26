## Step 2: The blocking call

Time to test hypothesis 1.

### 📖 Theory: `messages.create()`

`client.messages.create()` sends one request and returns a promise of the
complete `Message`. Its `content` is an array of **content blocks** — for
example a `text` block, and a `tool_use` block when the model wants to call
one of your tools. `stop_reason` says why generation ended.

Note what this lesson does **not** do: it never executes the tool. You only
look at what the model asks for. Running tools comes in later lessons.

Useful references:

- [Tool use overview](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview)
- [TypeScript SDK](https://github.com/anthropics/anthropic-sdk-typescript)
- [Models overview](https://docs.claude.com/en/docs/about-claude/models/overview) —
  use a small, cheap Claude Haiku model; look up its current ID here.

### ⌨️ Activity: complete `src/streamingBefore.ts`

1. Open `src/streamingBefore.ts`. The imports and the `Anthropic` client are
   already there — the client reads `ANTHROPIC_API_KEY` from the
   environment (your Codespaces secret, or a local `.env` via
   `dotenv/config`). Replace the `TODO` so the script:
   - calls `client.messages.create()` with your chosen model, a
     `max_tokens` limit, the `tools` from `src/tools.ts`, and the prompt from
     step 1 as a single user message,
   - prints the returned `content` as pretty JSON.

   Write it yourself. Copilot in this repo is set up as a mentor — ask it to
   explain things, not to write the file.

1. Run it and save the output:

   ```bash
   pnpm run before | tee runs/before.txt
   ```

   Watch the terminal while it runs. Does it match what you predicted?

1. Commit and push both files:

   ```bash
   git add src/streamingBefore.ts runs/before.txt
   git commit -m "Step 2: blocking call"
   git push
   ```

<details>
<summary>Having trouble? 🤷</summary><br/>

- `Could not resolve authentication method`: the secret isn't reaching the
  Codespace. Check that it's named exactly `ANTHROPIC_API_KEY` and has this
  repository selected, then rebuild the Codespace (**Command Palette →
  Codespaces: Rebuild Container**).
- The check looks for `"type": "tool_use"` and `"name": "read_file"` in
  `runs/before.txt`. If the model answered with text only, check that you
  passed `tools` in the request.
- Do not use `messages.stream()` in this file — that is step 4.

</details>
