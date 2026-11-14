import type { Question } from "../types";

const letters = ["A", "B", "C", "D", "E"];

interface Props {
  question: Question;
  selected?: number;
  onSelect: (option: number) => void;
}

export default function QuestionCard({ question, selected, onSelect }: Props) {
  const answered = selected !== undefined;
  const wrong = answered && selected !== question.answer;

  return (
    <div>
      <p className="text-lg font-medium leading-relaxed">{question.text}</p>

      <div className="mt-5 space-y-3">
        {question.options.map((option, i) => {
          const isCorrect = i === question.answer;
          const isPicked = i === selected;

          let style =
            "border-slate-200 bg-white hover:border-brand hover:bg-blue-50";
          let badge = "bg-slate-100 text-slate-600";

          if (answered) {
            if (isCorrect) {
              style = "border-green-500 bg-green-50";
              badge = "bg-green-500 text-white";
            } else if (isPicked) {
              style = "border-red-500 bg-red-50";
              badge = "bg-red-500 text-white";
            } else {
              style = "border-slate-200 bg-white opacity-60";
            }
          }

          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => onSelect(i)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${style}`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${badge}`}
              >
                {letters[i]}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {answered && !wrong && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          ✅ Correct!
        </p>
      )}

      {wrong && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          <p className="font-semibold text-amber-800">
            ❌ Not quite. The correct answer is {letters[question.answer]}.
          </p>
          <p className="mt-1 text-amber-900">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
