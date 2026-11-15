import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Layout() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-bold text-blue-800">
            Pass<span className="text-slate-800">Cheat</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span className=" text-black italic animate-pulse capitalize">
                {user.username.slice(0, 6)}...
              </span>
              <button
                onClick={logout}
                className="rounded-full bg-red-600 text-white  px-4 py-1.5 font-medium "
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/login"
                className="rounded-full bg-black px-4 py-1.5 font-medium text-white"
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
