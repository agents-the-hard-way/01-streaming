#!/usr/bin/env node
// Grades one exercise step: node .github/scripts/check-step.mjs <step>
// Writes one boolean output per check to $GITHUB_OUTPUT and exits 1 if any
// check fails. Never calls the Anthropic API; it only reads committed files.

import { appendFileSync, existsSync, readFileSync } from 'node:fs';

const NOTEBOOK = 'NOTEBOOK.md';
const FRAGMENT_LABEL = '[raw JSON fragment for tool_use]:';
const FINAL_MARKER = '--- finalMessage (assembled) ---';
const MIN_HYPOTHESIS_WORDS = 20;
const MIN_CONCLUSIONS = 2;
const MIN_WORDS_PER_CONCLUSION = 5;

const read = (path) => (existsSync(path) ? readFileSync(path, 'utf-8') : null);
const wordCount = (text) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;

// Body of the `## <n>.` section, without HTML comments and the placeholder line.
export function notebookSection(markdown, number) {
  if (markdown === null) return null;
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith(`## ${number}.`));
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => l.startsWith('## '));
  return (end === -1 ? rest : rest.slice(0, end))
    .join('\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .split('\n')
    .filter((l) => !/^_?Replace this line/i.test(l.trim()))
    .join('\n')
    .trim();
}

function checkHypothesis(number) {
  const section = notebookSection(read(NOTEBOOK), number);
  return {
    section_found: section !== null,
    section_filled: section !== null && wordCount(section) >= MIN_HYPOTHESIS_WORDS,
  };
}

function checkBlocking() {
  const log = read('runs/before.txt');
  return {
    log_exists: log !== null && log.trim().length > 0,
    log_has_tool_use:
      log !== null && /"type"\s*:\s*"tool_use"/.test(log) && /"name"\s*:\s*"read_file"/.test(log),
  };
}

// console.log(label, partial) prints "label partial", so an empty fragment
// is the label followed by a single space.
export function parseStreamingLog(log) {
  const lines = log.split(/\r?\n/);
  const fragments = lines
    .filter((l) => l.startsWith(FRAGMENT_LABEL))
    .map((l) => l.slice(FRAGMENT_LABEL.length).replace(/^ /, ''));

  let assembled = null;
  try {
    assembled = JSON.parse(fragments.join(''));
  } catch {}

  let finalInput = null;
  const marker = lines.indexOf(FINAL_MARKER);
  if (marker !== -1) {
    try {
      const content = JSON.parse(lines.slice(marker + 1).join('\n'));
      finalInput = content.find((block) => block.type === 'tool_use')?.input ?? null;
    } catch {}
  }

  return { nonEmptyFragments: fragments.filter((f) => f.length > 0).length, assembled, finalInput };
}

function jsonEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  return keysA.length === Object.keys(b).length && keysA.every((k) => jsonEqual(a[k], b[k]));
}

function checkStreaming() {
  const log = read('runs/after.txt');
  const parsed = log === null ? null : parseStreamingLog(log);
  return {
    log_exists: log !== null && log.trim().length > 0,
    several_fragments: parsed !== null && parsed.nonEmptyFragments >= 2,
    fragments_assemble:
      parsed !== null &&
      parsed.assembled !== null &&
      parsed.finalInput !== null &&
      jsonEqual(parsed.assembled, parsed.finalInput),
  };
}

function checkConclusions() {
  const section = notebookSection(read(NOTEBOOK), 3);
  const items = (section ?? '')
    .split('\n')
    .map((l) => l.match(/^\s*\d+[.)]\s+(.*)$/)?.[1])
    .filter(Boolean);
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

const run = STEPS[process.argv[2]];
if (!run) {
  console.error(`Unknown step '${process.argv[2]}'. Expected one of: ${Object.keys(STEPS).join(', ')}`);
  process.exit(2);
}
const results = run();
for (const [name, passed] of Object.entries(results)) {
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${passed}\n`);
}
if (!Object.values(results).every(Boolean)) process.exit(1);
