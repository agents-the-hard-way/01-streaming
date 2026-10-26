## Step 4: The streaming call

Same request as step 2, observed as it is generated.

### 📖 Theory: listening to the stream

`client.messages.stream()` returns a stream object straight away — no
`await` — and you subscribe to what it emits:

- `text` — fires with each piece of text as it arrives,
- `streamEvent` — fires with every raw server-sent event. Tool arguments
  come as events whose `type` is `content_block_delta` and whose
  `delta.type` is `input_json_delta`; the piece of JSON is in
  `delta.partial_json`,
- `finalMessage()` — resolves to the complete, assembled `Message`.

See [Streaming messages](https://docs.claude.com/en/docs/build-with-claude/streaming).

### ⌨️ Activity: fill in two gaps

`src/streamingAfter.ts` already prints the text as it streams and the final
tool input at the end (the helpers are in `src/print.ts`). You write the two
lines that are the point of this lesson.

1. **TODO 1** — replace `undefined` with a call that sends the same
   `request` as a stream.
1. **TODO 2** — inside the `streamEvent` handler, when the event carries a
   piece of tool-call JSON, pass that piece to `printFragment()`.
1. Run it and save the output:

   ```bash
   pnpm run after | tee runs/after.txt
   ```

   Look at the `[fragment]` lines. The check glues them together, parses the
   result, and compares it with the `[final]` line.

1. Commit and push both files:

   ```bash
   git add src/streamingAfter.ts runs/after.txt
   git commit -m "Step 4: streaming call"
   git push
   ```

<details>
<summary>💡 Hint for TODO 1</summary><br/>

It's the streaming sibling of the method you used in step 2, with the same
argument.

<details>
<summary>Show the answer</summary><br/>

```ts
return client.messages.stream(request);
```

</details>
</details>

<details>
<summary>💡 Hint for TODO 2</summary><br/>

Check two fields before using the event: its `type`, then its
`delta.type`. The theory section above names both values. Checking them in
that order also lets TypeScript know `delta.partial_json` exists.

<details>
<summary>Show the answer</summary><br/>

```ts
if (event.type === 'content_block_delta' && event.delta.type === 'input_json_delta') {
  printFragment(event.delta.partial_json);
}
```

</details>
</details>

<details>
<summary>Having trouble? 🤷</summary><br/>

- **No `[fragment]` lines?** TODO 2 isn't matching any event. Temporarily
  add `console.log(event.type)` in the handler to see what arrives.
- **Only one fragment?** That can happen with a very short argument. Run it
  again — the check needs at least two non-empty fragments.

</details>
