## Step 1: Set up, then predict

Welcome to **Agents the Hard Way**. Every lesson works on the raw Claude
Messages API, with no agent framework in between, so you see exactly what
the model sends back and when.

This lesson asks one question: **how does a response actually arrive?** You
will make the same request twice — once with a blocking call, once streamed
— and compare what you see.

### 📖 Theory: hypothesis first

Each lesson follows the same loop: **predict → run → compare**. You write
down what you expect *before* running anything, then capture real output,
then reconcile the two. A wrong prediction you can explain teaches more than
a right one you guessed. That is why the exercise checks your notebook, not
just your code.

### ⌨️ Activity: open your environment

1. Add your Anthropic API key as a Codespaces secret, so it never sits in a
   file in this repo:
   - Go to **github.com → Settings → Codespaces → Secrets → New secret**.
   - Name: `ANTHROPIC_API_KEY`. Value: your key from the
     [Anthropic Console](https://console.anthropic.com/settings/keys).
   - Under **Repository access**, select this repository.

   > [!NOTE]
   > This whole lesson makes two short requests to a small model and costs
   > well under one US cent.

1. Open a Codespace on your copy of the exercise:

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

   Confirm the **Repository** field shows your copy (`{{full_repo_name}}`),
   not `agents-the-hard-way/01-streaming`.

1. Wait for VS Code to load. Dependencies install automatically, and
   `NOTEBOOK.md` opens on its own.

### ⌨️ Activity: write your first hypothesis

Look at `src/tools.ts` (the tools you will offer the model) and
`sandbox/notes.txt` (the file you will ask it to read). You will send this
prompt, with those tools, using `client.messages.create()`:

> First say one sentence about what you're about to do, then read the file
> at path sandbox/notes.txt.

1. In `NOTEBOOK.md`, under **1. Hypothesis: blocking `messages.create()`**,
   replace the placeholder line with your prediction. Cover at least:
   - when the call returns, and what your terminal shows while it waits,
   - what the returned content looks like — which blocks, in what order,
   - whether the model will actually read the file.

   At least 20 words. Wrong is fine; vague is not.

1. Commit and push to `main`:

   ```bash
   git add NOTEBOOK.md
   git commit -m "Step 1: hypothesis for create()"
   git push
   ```

1. Come back to this issue. I'll check your notebook within a minute.

<details>
<summary>Having trouble? 🤷</summary><br/>

- Keep the heading line `## 1. Hypothesis: ...` unchanged — that is how the
  check finds your section.
- The placeholder line must be gone; HTML comments `<!-- -->` don't count
  as words.
- If nothing happens after pushing, open the **Actions** tab and look at the
  latest **Step 1** run.

</details>
