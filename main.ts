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

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The streetlight flickers on exactly as I pass, and for one dark street I am the reason the night works.";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space. The entry is one
// sentence on one line, so check those limits before writing.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
