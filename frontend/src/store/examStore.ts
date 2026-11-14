import { create } from 'zustand'
import { questions as allQuestions } from '../data/questions'
import type { Question } from '../types'

interface ExamState {
  subjectId: string | null
  questions: Question[]
  index: number
  reached: number // how many questions the user has got to
  answers: Record<string, number>
  start: (subjectId: string) => void
  select: (questionId: string, option: number) => void
  next: () => void
  prev: () => void
}

export const useExamStore = create<ExamState>((set) => ({
  subjectId: null,
  questions: [],
  index: 0,
  reached: 1,
  answers: {},

  start: (subjectId) =>
    set({
      subjectId,
      questions: allQuestions.filter((q) => q.subjectId === subjectId),
      index: 0,
      reached: 1,
      answers: {},
    }),

  select: (questionId, option) =>
    set((s) =>
      s.answers[questionId] !== undefined
        ? s
        : { answers: { ...s.answers, [questionId]: option } },
    ),

  next: () =>
    set((s) => {
      const index = Math.min(s.index + 1, s.questions.length - 1)
      return { index, reached: Math.max(s.reached, index + 1) }
    }),

  prev: () => set((s) => ({ index: Math.max(s.index - 1, 0) })),
}))