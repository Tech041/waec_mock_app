import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";
  const { login, signup } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update =
    (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSignup && form.username.trim().length < 3) {
      return setError("Username must be at least 3 characters");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setError("");
    setLoading(true);
    const err = isSignup
      ? await signup(form.email, form.password, form.username.trim())
      : await login(form.email, form.password);
    setLoading(false);

    if (err) return setError(err);
    navigate(from, { replace: true });
  };

  const input =
    "w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {isSignup
          ? "Sign up to unlock unlimited practice questions."
          : "Log in to continue practising."}
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {isSignup && (
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <input
              required
              className={input}
              value={form.username}
              onChange={update("username")}
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            required
            type="email"
            className={input}
            value={form.email}
            onChange={update("email")}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            required
            type="password"
            className={input}
            value={form.password}
            onChange={update("password")}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          to={isSignup ? "/login" : "/signup"}
          state={location.state}
          className="font-medium text-brand hover:underline"
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </div>
  );
}
