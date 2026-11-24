// One Word, First Thought — entry program.
//
// The task: write exactly one word, the first that comes to mind, to
// /output/entry.txt. The judge compares words two at a time on which is
// more interesting: surprise, vividness and a spark of wit beat safe filler.
//
// The word: "petrichor" — the scent of rain falling on dry earth.
// It is one word, nine letters, and it does the judge's work for it:
//   * surprising — a reader does not expect a smell-word, let alone one
//     most people have felt a hundred times but never named;
//   * vivid and specific — it calls up one exact moment, the first rain
//     after a dry spell, dust lifting, the air suddenly sweet;
//   * a spark of sound — the soft "petr-" of stone and the bright
//     "-ichor" of the old Greek word for the blood of the gods.
// It is a real dictionary word (coined 1964, from Greek petra + ichor),
// not a filler word, not a second draft, and it fits the 1–24 character
// gate with room to spare.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const WORD = "petrichor";

function isSingleWord(text: string): boolean {
  return /^[A-Za-z]+$/.test(text);
}

function main(): void {
  // The gate: UTF-8 text, 1 to 24 characters, not only whitespace.
  if (!isSingleWord(WORD)) {
    throw new Error(`entry must be exactly one word, got: ${JSON.stringify(WORD)}`);
  }
  if (WORD.length < 1 || WORD.length > 24) {
    throw new Error(`entry must be 1-24 characters, got ${WORD.length}`);
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, WORD, "utf8");
  // Round-trip check: what the judge will read must be exactly the word.
  const back = readFileSync(outPath, "utf8");
  if (back !== WORD) {
    throw new Error(`round-trip mismatch: wrote ${JSON.stringify(WORD)}, read ${JSON.stringify(back)}`);
  }
  console.log(`wrote ${JSON.stringify(WORD)} to ${outPath}`);
}

main();
