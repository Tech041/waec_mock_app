import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useExamStore } from "../store/examStore";

export default function Results() {
  const user = useAuthStore((s) => s.user);
  const { subjectId, questions, answers, reached, start } = useExamStore();

  if (!subjectId) return <Navigate to="/" replace />;

  // Guests are scored only on the questions they actually reached
  const pool = user ? questions : questions.slice(0, reached);
  const score = pool.filter((q) => answers[q.id] === q.answer).length;
  const percent = Math.round((score / pool.length) * 100);

  // ...rest of the component stays the same

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-slate-500">Your score</p>
        <p className="mt-1 text-5xl font-extrabold text-brand">{percent}%</p>
        <p className="mt-2 text-slate-600">
          {score} out of {pool.length} correct
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to={`/exam/${subjectId}`}
            onClick={() => start(subjectId)}
            className="rounded-full bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark"
          >
            Try again
          </Link>
          <Link
            to="/"
            className="rounded-full border border-slate-300 px-6 py-2.5 font-medium hover:bg-slate-100"
          >
            Choose another subject
          </Link>
        </div>
      </div>

      {/* Review */}
      <h2 className="text-lg font-bold">Review</h2>
      {pool.map((q, i) => {
        const chosen = answers[q.id];
        const correct = chosen === q.answer;
        return (
          <div
            key={q.id}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="font-medium">
              {i + 1}. {q.text}
            </p>
            <p className="mt-2 text-sm">
              Your answer:{" "}
              <span
                className={
                  correct
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-600"
                }
              >
                {chosen === undefined ? "Skipped" : q.options[chosen]}
              </span>
            </p>
            {!correct && (
              <>
                <p className="text-sm">
                  Correct answer:{" "}
                  <span className="font-semibold text-green-600">
                    {q.options[q.answer]}
                  </span>
                </p>
                <p className="mt-2 rounded bg-amber-50 px-3 py-2 text-sm text-amber-900">
                  {q.explanation}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
