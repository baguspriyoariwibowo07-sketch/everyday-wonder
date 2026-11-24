// Everyday Wonder, Two Days to Find the Line
// Writes a single one-sentence entry to /output/entry.txt.
//
// The sentence: a streetlight that flickers on exactly as the
// narrator passes, so that for one dark street the narrator is the
// reason the night works. The field saturates with shadows arriving
// late, sighing elevators and kettles clicking on time; a streetlight
// that keeps a personal schedule for one passer-by is an angle the
// reader has not met, grounded in the most ordinary object on any
// street, and the surprise lands in a single read.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The streetlight flickers on exactly as I pass, and for one dark street I am the reason the night works.";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space. The entry is one
// sentence on one line, so validate the sentence against the same
// limits before writing — an entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validateEntry(LINE);

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored sentence");
  }
}

main();
