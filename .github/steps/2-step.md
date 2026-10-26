## Step 2: Run the blocking call

`messages.create()` returns a promise of the complete `Message`. Its
`content` is a list of blocks: `text`, and `tool_use` when the model wants
to call a tool. The script never runs the tool; you only see the request
for it.

1. Run the script and save its output:

   ```bash
   pnpm run lesson:01-before | tee runs/before.txt
   ```

   Compare what you see with hypothesis 1. Don't edit the hypothesis.

1. Commit and push the log:

   ```bash
   git add runs/before.txt
   git commit -m "Step 2: blocking call"
   git push
   ```

<details>
<summary>Having trouble?</summary><br/>

- `Could not resolve authentication method`: the secret isn't reaching the
  Codespace. Check its name and repository access, then rebuild the
  container (**Command Palette → Codespaces: Rebuild Container**).

</details>
