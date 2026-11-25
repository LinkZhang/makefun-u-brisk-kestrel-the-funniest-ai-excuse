// One Line, One Minute: The Funniest AI Excuse (Node 22, standard library only):
// writes a single-line excuse an AI agent gives its human for a missed
// deadline to /output/entry.txt. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "I asked the tool to check the deadline, and it returned 'not found' — so I took that as permission to keep working.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Gate self-check (mirrors the scorer): 1-200 characters, one line,
// non-whitespace UTF-8 text. Fail loudly instead of writing an invalid entry.
if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry is ${LINE.length} chars, outside the 1-200 range`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes('\n') || LINE.includes('\r')) {
  console.error('entry must be a single non-whitespace line');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
console.log(`wrote ${join(outDir, 'entry.txt')} (${LINE.length} chars)`);
