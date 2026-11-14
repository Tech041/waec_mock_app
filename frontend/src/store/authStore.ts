import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

const USERS_KEY = "waec_users";

interface StoredUser extends User {
  passwordHash: string;
}

const readUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredUser[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

async function hash(email: string, password: string) {
  const text = `${email.toLowerCase()}:${password}`;
  // crypto.subtle only exists on https/localhost, so fall back when testing on a LAN IP
  if (!crypto.subtle) return btoa(encodeURIComponent(text));
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buf), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

// Both actions resolve to an error message, or null on success.
interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (
    email: string,
    password: string,
    username: string,
  ) => Promise<string | null>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      signup: async (email, password, username) => {
        const users = readUsers();
        const e = email.trim().toLowerCase();

        if (users.some((u) => u.email === e))
          return "An account with this email already exists";
        if (
          users.some((u) => u.username.toLowerCase() === username.toLowerCase())
        )
          return "That username is taken";

        users.push({
          email: e,
          username,
          passwordHash: await hash(e, password),
        });
        writeUsers(users);
        set({ user: { email: e, username } });
        return null;
      },

      login: async (email, password) => {
        const e = email.trim().toLowerCase();
        const found = readUsers().find((u) => u.email === e);

        if (!found || found.passwordHash !== (await hash(e, password)))
          return "Incorrect email or password";

        set({ user: { email: found.email, username: found.username } });
        return null;
      },

      logout: () => set({ user: null }),
    }),
    { name: "auth", partialize: (s) => ({ user: s.user }) },
  ),
);
