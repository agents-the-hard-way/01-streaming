## Step 1: Set up and predict

In this lesson you send the same request to Claude twice: once with
`messages.create()`, once with `messages.stream()`, and compare what you
see. Before running anything, you write down what you expect.

### Set up

1. Add your Anthropic API key as a Codespaces secret: **github.com →
   Settings → Codespaces → Secrets → New secret**, name `ANTHROPIC_API_KEY`,
   value from the [Anthropic Console](https://console.anthropic.com/settings/keys),
   repository access set to this repository. The lesson costs well under one
   US cent.

1. Open a Codespace on your copy:

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

### Hypothesis 1

Read `src/streamingBefore.ts`. It sends one prompt with three tools from
`src/tools.ts` and prints the result.

1. In `NOTEBOOK.md`, under **1. Hypothesis**, write what you expect:
   when the call returns, what you see while waiting, and what the returned
   content looks like. At least 20 words.

1. Commit and push:

   ```bash
   git add NOTEBOOK.md
   git commit -m "Step 1: hypothesis"
   git push
   ```

<details>
<summary>Having trouble?</summary><br/>

- Keep the `## 1. Hypothesis` heading unchanged and remove the placeholder
  line.
- If nothing happens after pushing, check the **Actions** tab.

</details>
