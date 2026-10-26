# Agents the Hard Way — 01: Token-level streaming

_Make the same request to Claude twice, blocking and streamed, and see for
yourself how a response — and a tool call — actually arrives._

## Welcome

**Agents the Hard Way** teaches how AI agents work by building them on the
raw Claude Messages API, with no agent framework in between. Every lesson
follows the same loop: **predict → run → compare**. You write a hypothesis
before you run anything, capture real output, and explain the difference.

- **Who is this for**: developers comfortable with TypeScript who want to
  understand what agent frameworks do for them, by doing it by hand first.
- **What you'll learn**: what `messages.create()` returns and when; how
  `messages.stream()` delivers the same response as events; how a tool
  call's JSON arguments arrive in fragments and get reassembled.
- **What you'll build**: nothing big — you fill in three lines across two
  ready-made scripts. The work is in predicting what they'll print and
  explaining what they actually printed, in a lab notebook.
- **Prerequisites**:
  - TypeScript and Node.js basics.
  - An [Anthropic API key](https://console.anthropic.com/settings/keys).
    This lesson makes two short requests and costs well under one US cent.
- **How long**: about 30 minutes.

In this exercise, you will:

1. Set up a Codespace and predict what a blocking call returns.
2. Fill in the blocking call and capture its output.
3. Predict how the same request looks when streamed.
4. Fill in the streaming call and prove the tool-call fragments reassemble.
5. Compare predictions with reality and write your conclusions.

### How to start this exercise

Copy the exercise to your account, give the bot **about 20 seconds** to
prepare the first step, then **refresh the page**.

[![](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=agents-the-hard-way&template_name=01-streaming&owner=%40me&name=agents-the-hard-way-01-streaming&description=Agents%20the%20Hard%20Way%3A%2001%20Token-level%20streaming&visibility=public)

<details>
<summary>Having trouble? 🤷</summary><br/>

When copying the exercise, we recommend the following settings:

- For owner, choose your personal account.
- Keep the repository **public** — GitHub Actions minutes are free for
  public repositories, and the exercise bot runs on Actions.

If the exercise isn't ready in 20 seconds, check the **Actions** tab of
your copy:

- If a job is still running, give it a moment.
- If a job failed, please
  [open an issue](https://github.com/agents-the-hard-way/01-streaming/issues)
  here. Nice, you found a bug! 🐛

</details>

---

Reference solutions for every lesson:
[agents-the-hard-way-solutions](https://github.com/agents-the-hard-way/agents-the-hard-way-solutions).
Try it yourself first — that's the whole point.
