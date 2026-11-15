import type { Subject } from "../types";
import { math } from "./math";
import { english } from "./english";
import { physics } from "./physics";
import { biology } from "./biology";
import { chemistry } from "./chemistry";
import { agriculture } from "./agriculture";
import { economics } from "./economics";
import { geography } from "./geography";

export const subjects: Subject[] = [
  { id: "english", name: "English" },
  { id: "physics", name: "Physics" },
  { id: "biology", name: "Biology" },
  { id: "chemistry", name: "Chemistry" },
  { id: "math", name: "Mathematics" },
  { id: "agriculture", name: "Agriculture" },
  { id: "economics", name: "Economics" },
  { id: "geography", name: "Geography" },
];

export const questions = [
  ...math,
  ...english,
  ...physics,
  ...biology,
  ...chemistry,
  ...agriculture,
  ...economics,
  ...geography,
];
