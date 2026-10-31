# Agents the Hard Way: 01 Token-level streaming

Send the same request to Claude twice, with `messages.create()` and with
`messages.stream()`, and compare how the response arrives.

- **Prerequisites**: Node.js 22 or newer, pnpm (`corepack enable` enables it),
  and an [Anthropic API key](https://console.anthropic.com/settings/keys).
- **Cost**: well under one US cent.
- **Time**: about 30 minutes.

## Run

```bash
git clone https://github.com/agents-the-hard-way/01-streaming
cd 01-streaming
pnpm install
cp .env.example .env        # put your key after ANTHROPIC_API_KEY=
pnpm run lesson:01-before   # messages.create()
pnpm run lesson:01-after    # messages.stream()
```

Run the commands from the repository root: the prompt reads
`sandbox/notes.txt` relative to the current directory. `.env` is git-ignored,
so your key stays on your machine.

Reference solution:
[agents-the-hard-way-solutions](https://github.com/agents-the-hard-way/agents-the-hard-way-solutions/tree/main/lessons/01-streaming).
