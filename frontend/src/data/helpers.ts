import type { Question } from '../types'

type Row = [text: string, options: string[], answer: number, explanation: string]

export const build = (subjectId: string, prefix: string, rows: Row[]): Question[] =>
  rows.map(([text, options, answer, explanation], i) => ({
    id: `${prefix}${i + 1}`,
    subjectId,
    text,
    options,
    answer,
    explanation,
  }))