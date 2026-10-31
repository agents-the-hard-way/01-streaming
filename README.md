# Agents the Hard Way: 01 Token-level streaming

Send the same request to Claude twice, with `messages.create()` and with
`messages.stream()`, and see how the response and its tool call arrive.

- **Who is this for**: developers who know TypeScript and want to understand
  the raw Claude Messages API.
- **What you do**: write a hypothesis, run the code, compare. You fill in
  one `TODO` in the streaming script.
- **Prerequisites**: an [Anthropic API key](https://console.anthropic.com/settings/keys).
  The lesson costs well under one US cent.
- **How long**: about 30 minutes.

## Start

Copy the exercise to your account, wait about 20 seconds, then refresh the
page. The first step appears in the **Issues** tab.

[![](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=agents-the-hard-way&template_name=01-streaming&owner=%40me&name=agents-the-hard-way-01-streaming&description=Agents%20the%20Hard%20Way%3A%2001%20Token-level%20streaming&visibility=public)

Keep the copy public: the exercise runs on GitHub Actions, which are free for
public repositories. If nothing appears, check the **Actions** tab of your
copy and [open an issue](https://github.com/agents-the-hard-way/01-streaming/issues)
here if a job failed.

Reference solution:
[agents-the-hard-way-solutions](https://github.com/agents-the-hard-way/agents-the-hard-way-solutions/tree/main/lessons/01-streaming).

## Run locally

You need Node.js 22 or newer and pnpm (`corepack enable` enables it).

```bash
git clone https://github.com/agents-the-hard-way/01-streaming
cd 01-streaming
pnpm install
cp .env.example .env   # then put your key after ANTHROPIC_API_KEY=
```

Write your hypothesis in `NOTEBOOK.md` first, then run the two scripts:

```bash
pnpm run lesson:01-before   # messages.create()
pnpm run lesson:01-after    # messages.stream()
```

Run them from the repository root: the prompt reads `sandbox/notes.txt`
relative to the current directory. `.env` is git-ignored, so your key stays
on your machine.
