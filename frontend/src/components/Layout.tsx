import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Layout() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-bold text-brand">
            WAEC<span className="text-slate-800">Mock</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden text-slate-500 sm:inline">
                Hi, {user.username}
              </span>
              <button
                onClick={logout}
                className="rounded-full border border-slate-300 px-4 py-1.5 font-medium hover:bg-slate-100"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/signup"
                className="rounded-full border border-brand px-4 py-1.5 font-medium text-brand hover:bg-blue-50"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="rounded-full bg-brand px-4 py-1.5 font-medium text-white hover:bg-brand-dark"
              >
                Sign in
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} WAECMock. Practice makes perfect.
      </footer>
    </div>
  );
}
