## Step 2: The blocking call

Time to test hypothesis 1.

### 📖 Theory: `messages.create()`

`client.messages.create()` sends one request and returns a promise of the
complete `Message`. Its `content` is an array of **content blocks** — for
example a `text` block, and a `tool_use` block when the model wants to call
one of your tools. `stop_reason` says why generation ended.

Note what this lesson does **not** do: it never executes the tool. You only
look at what the model asks for. Running tools comes in later lessons.

### ⌨️ Activity: fill in one line

Everything around the API call is already written for you: the request
(model, tools, prompt) is in `src/request.ts`, and the script prints whatever
comes back. You only write the call itself.

1. Open `src/streamingBefore.ts` and find the line marked `✏️ TODO`.
1. Replace `undefined` with a call that sends `request` and waits for the
   whole message.
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
<summary>💡 Hint</summary><br/>

The method lives on `client.messages`, takes the request as its only
argument, and returns a promise. `send()` is already `async`, so you can
return that promise directly.

<details>
<summary>Show the answer</summary><br/>

```ts
return client.messages.create(request);
```

</details>
</details>

<details>
<summary>Having trouble? 🤷</summary><br/>

- `The TODO in src/streamingBefore.ts is still open.`: you're running the
  file before replacing `undefined`.
- `Could not resolve authentication method`: the secret isn't reaching the
  Codespace. Check that it's named exactly `ANTHROPIC_API_KEY` and has this
  repository selected, then rebuild the Codespace (**Command Palette →
  Codespaces: Rebuild Container**).
- Do not use `messages.stream()` in this file — that is step 4.

</details>
