## Step 4: Log the tool call fragments

The stream emits a `streamEvent` for every raw event. A tool call's
arguments arrive in events with `type` `content_block_delta` and
`delta.type` `input_json_delta`. The piece of JSON is in
`delta.partial_json`.

1. In `src/streamingAfter.ts`, fill in the `TODO` in the `streamEvent`
   handler: for those events, log the fragment with

   ```ts
   console.log('[raw JSON fragment for tool_use]:', event.delta.partial_json);
   ```

1. Run the script and save its output:

   ```bash
   pnpm run lesson:01-after | tee runs/after.txt
   ```

   The check joins all fragments and compares them with the `tool_use`
   input in `finalMessage`.

1. Commit and push:

   ```bash
   git add src/streamingAfter.ts runs/after.txt
   git commit -m "Step 4: streaming call"
   git push
   ```

<details>
<summary>Show the answer</summary><br/>

```ts
if (event.type === 'content_block_delta' && event.delta.type === 'input_json_delta') {
  console.log('[raw JSON fragment for tool_use]:', event.delta.partial_json);
}
```

</details>
