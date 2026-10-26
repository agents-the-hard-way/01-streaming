#!/usr/bin/env node
// Grades one exercise step. Zero dependencies, Node 20+.
//
// Usage: node .github/scripts/check-step.mjs <step-number>
//
// Writes one boolean output per check to $GITHUB_OUTPUT (when set) and
// prints a human-readable report. Exits 1 if any check failed.
//
// The checker never calls the Anthropic API. It only checks that what the
// learner committed is consistent: code that uses the right SDK call, and
// a captured log whose contents prove the behaviour the step is about.

import { appendFileSync, existsSync, readFileSync } from 'node:fs';

const NOTEBOOK = 'NOTEBOOK.md';
const MIN_HYPOTHESIS_WORDS = 20;
const MIN_CONCLUSIONS = 2;
const MIN_WORDS_PER_CONCLUSION = 5;

const read = (path) => (existsSync(path) ? readFileSync(path, 'utf-8') : null);

// Text between a heading that starts with `## <n>.` and the next `## ` heading,
// with HTML comments and the template's placeholder line removed.
export function notebookSection(markdown, number) {
  if (markdown === null) return null;
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith(`## ${number}.`));
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => l.startsWith('## '));
  const body = (end === -1 ? rest : rest.slice(0, end)).join('\n');
  return body
    .replace(/<!--[\s\S]*?-->/g, '')
    .split('\n')
    .filter((l) => !/^_?Replace this line/i.test(l.trim()))
    .join('\n')
    .trim();
}

const wordCount = (text) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;

function checkHypothesis(number) {
  const section = notebookSection(read(NOTEBOOK), number);
  return {
    section_found: section !== null,
    section_filled: section !== null && wordCount(section) >= MIN_HYPOTHESIS_WORDS,
  };
}

// Strip line comments and block comments so `// messages.stream()` in a
// comment doesn't count as using it.
const stripComments = (code) => code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

function checkBlocking() {
  const code = read('src/streamingBefore.ts');
  const log = read('runs/before.txt');
  const source = code === null ? '' : stripComments(code);
  return {
    uses_create: /\.messages\.create\s*\(/.test(source) && !/\.messages\.stream\s*\(/.test(source),
    log_exists: log !== null && log.trim().length > 0,
    log_has_tool_use:
      log !== null && /"type"\s*:\s*"tool_use"/.test(log) && /"name"\s*:\s*"read_file"/.test(log),
  };
}

export function parseStreamingLog(log) {
  const lines = log.split(/\r?\n/);
  const fragments = lines
    .filter((l) => l.startsWith('[fragment] ') || l === '[fragment]')
    .map((l) => l.slice('[fragment] '.length));
  const finalLine = lines.find((l) => l.startsWith('[final] '));

  let assembled = null;
  try {
    assembled = JSON.parse(fragments.join(''));
  } catch {
    // stays null
  }

  let final = null;
  try {
    final = finalLine ? JSON.parse(finalLine.slice('[final] '.length)) : null;
  } catch {
    // stays null
  }

  return { nonEmptyFragments: fragments.filter((f) => f.length > 0).length, assembled, final };
}

// Order-insensitive deep equality for plain JSON values.
function jsonEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  return keysA.length === keysB.length && keysA.every((k) => jsonEqual(a[k], b[k]));
}

function checkStreaming() {
  const code = read('src/streamingAfter.ts');
  const log = read('runs/after.txt');
  const source = code === null ? '' : stripComments(code);
  const parsed = log === null ? null : parseStreamingLog(log);
  return {
    uses_stream: /\.messages\.stream\s*\(/.test(source),
    log_exists: log !== null && log.trim().length > 0,
    several_fragments: parsed !== null && parsed.nonEmptyFragments >= 2,
    fragments_assemble:
      parsed !== null &&
      parsed.assembled !== null &&
      parsed.final !== null &&
      jsonEqual(parsed.assembled, parsed.final),
  };
}

export function conclusionItems(section) {
  if (section === null) return [];
  return section
    .split('\n')
    .map((l) => l.match(/^\s*\d+[.)]\s+(.*)$/))
    .filter(Boolean)
    .map((m) => m[1]);
}

function checkConclusions() {
  const section = notebookSection(read(NOTEBOOK), 3);
  const items = conclusionItems(section);
  return {
    section_found: section !== null,
    enough_conclusions:
      items.filter((i) => wordCount(i) >= MIN_WORDS_PER_CONCLUSION).length >= MIN_CONCLUSIONS,
  };
}

const STEPS = {
  1: () => checkHypothesis(1),
  2: checkBlocking,
  3: () => checkHypothesis(2),
  4: checkStreaming,
  5: checkConclusions,
};

function main() {
  const step = process.argv[2];
  const run = STEPS[step];
  if (!run) {
    console.error(`Unknown step '${step}'. Expected one of: ${Object.keys(STEPS).join(', ')}`);
    process.exit(2);
  }

  const results = run();
  for (const [name, passed] of Object.entries(results)) {
    console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}`);
    if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${passed}\n`);
  }
  if (!Object.values(results).every(Boolean)) process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
