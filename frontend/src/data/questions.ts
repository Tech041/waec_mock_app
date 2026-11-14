import type { Subject } from "../types";
import { math } from "./math";
import { english } from "./english";
import { physics } from "./physics";
import { biology } from "./biology";

export const subjects: Subject[] = [
  { id: "math", name: "Mathematics", emoji: "📐" },
  { id: "english", name: "English", emoji: "📖" },
  { id: "physics", name: "Physics", emoji: "⚛️" },
  { id: "biology", name: "Biology", emoji: "🧬" },
];

export const questions = [...math, ...english, ...physics, ...biology];
