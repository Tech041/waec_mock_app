import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { questions, subjects } from "../data/questions";
import { useExamStore } from "../store/examStore";
import { FREE_LIMIT } from "../config";

export default function Home() {
  const navigate = useNavigate();
  const start = useExamStore((s) => s.start);

  const [subjectId, setSubjectId] = useState(subjects[0].id);
  const [picked, setPicked] = useState<Record<string, number>>({}); // sample answers

  const sample = questions.find((q) => q.subjectId === subjectId)!;
  const subject = subjects.find((s) => s.id === subjectId)!;

  const startExam = () => {
    start(subjectId);
    navigate(`/exam/${subjectId}`);
  };

  return (
    <div className="space-y-12 ">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
          The <span className="text-blue-600">Best Way</span> to Prepare
          <br className="hidden sm:block" /> for Your WAEC Exams
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">
          Practice real exam-style questions and get instant explanations
          whenever you pick the wrong answer.
        </p>
        <button
          onClick={startExam}
          className="mt-6 rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow hover:bg-blue-700"
        >
          Take a free test
        </button>
        <p className="mt-2 text-xs text-slate-400">
          Free for up to {FREE_LIMIT} questions. Sign in for unlimited practice.
        </p>
      </section>

      {/* Sample questions by subject */}
      <section>
        <h2 className="text-center text-xl font-bold">Try a sample question</h2>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubjectId(s.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                s.id === subjectId
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white hover:border-blue-600"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <QuestionCard
            question={sample}
            selected={picked[sample.id]}
            onSelect={(o) => setPicked({ ...picked, [sample.id]: o })}
          />
          <button
            onClick={startExam}
            className="mt-6 w-full rounded-lg border border-brand py-2.5 font-semibold text-brand hover:bg-blue-50"
          >
            Practise more {subject.name} questions →
          </button>
        </div>
      </section>
    </div>
  );
}
