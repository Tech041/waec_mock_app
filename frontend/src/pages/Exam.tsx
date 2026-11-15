import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { subjects } from "../data/questions";
import { useAuthStore } from "../store/authStore";
import { useExamStore } from "../store/examStore";
import { useOnline } from "../hooks/useOnline";
import { FREE_LIMIT, OFFLINE_LIMIT } from "../config";

export default function Exam() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const online = useOnline();
  const {
    subjectId: activeId,
    questions,
    index,
    answers,
    start,
    select,
    next,
    prev,
  } = useExamStore();
  const [showGate, setShowGate] = useState(false);

  const subject = subjects.find((s) => s.id === subjectId);

  useEffect(() => {
    if (subject && activeId !== subjectId) start(subjectId!);
  }, [subject, activeId, subjectId, start]);

  if (!subject) return <Navigate to="/" replace />;
  if (activeId !== subjectId || questions.length === 0) return null;

  const question = questions[index];
  const total = questions.length;
  const isLast = index === total - 1;
  const guestLimit = online ? FREE_LIMIT : OFFLINE_LIMIT;
  const hitLimit = !user && total > guestLimit && index >= guestLimit - 1;

  const handleNext = () => {
    if (hitLimit) return setShowGate(true);
    if (isLast) return navigate("/results");
    next();
  };

  const goAuth = (path: "/login" | "/signup") =>
    navigate(path, { state: { from: location.pathname } });

  return (
    <div className="mx-auto max-w-2xl">
      {!online && !user && (
        <p className="mb-4 rounded-lg bg-amber-50 px-4 py-2 text-center text-sm text-amber-800">
           You're offline. Guests can answer {OFFLINE_LIMIT} questions
          offline. Log in to continue.
        </p>
      )}

      {/* Header */}
      <div className="flex items-center justify-between text-sm">
        <Link to="/" className="text-slate-500 hover:text-brand">
          ← Exit
        </Link>
        <span className="font-semibold">{subject.name}</span>
        <span className="text-slate-500">
          {index + 1} / {total}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-brand transition-all"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-brand">
          Question {index + 1}
        </p>
        <QuestionCard
          key={question.id}
          question={question}
          selected={answers[question.id]}
          onSelect={(o) => select(question.id, o)}
        />
      </div>

      {/* Nav buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={prev}
          disabled={index === 0}
          className="rounded-full border border-slate-300 bg-white px-6 py-2.5 font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="rounded-full bg-blue-600 px-8 py-2.5 font-semibold text-white hover:bg-brand-dark"
        >
          {isLast ? "Finish" : "Next →"}
        </button>
      </div>

      {/* Auth gate */}
      {showGate && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="text-4xl">🔒</div>
            <h2 className="mt-2 text-xl font-bold">Want to keep going?</h2>
            <p className="mt-2 text-sm text-slate-500">
              You've used your {guestLimit} free questions
              {!online && " while offline"}. Log in or create a free account to
              continue.
            </p>
            <div className="mt-5 space-y-2">
              <button
                onClick={() => goAuth("/login")}
                className="w-full rounded-lg bg-brand py-2.5 font-semibold text-white hover:bg-brand-dark"
              >
                Log in
              </button>
              <button
                onClick={() => goAuth("/signup")}
                className="w-full rounded-lg border border-brand py-2.5 font-semibold text-brand hover:bg-blue-50"
              >
                Create account
              </button>
              <button
                onClick={() => navigate("/results")}
                className="w-full py-2 text-sm text-slate-500 hover:text-slate-800"
              >
                Finish and see my results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
