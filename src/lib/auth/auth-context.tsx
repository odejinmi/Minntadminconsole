"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthState, SessionUser } from "./types";

const STORAGE_KEY = "minnt.session";

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<SessionUser>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Stub session derived from the login email. Swap for a real token exchange later. */
function createSession(email: string): SessionUser {
  const handle = email.split("@")[0] ?? "admin";
  const name = handle
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    name: name || "Akanji Joseph",
    role: "Super Admin",
    email,
    accountName: "Minnt",
  };
}

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const [state, setState] = useState<AuthState>({ user: null, isReady: false });

  useEffect(() => {
    let user: SessionUser | null = null;
    try {
      const stored = globalThis.localStorage.getItem(STORAGE_KEY);
      if (stored) user = JSON.parse(stored) as SessionUser;
    } catch {
      user = null;
    }
    // One-time hydration of the persisted session on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ user, isReady: true });
  }, []);

  const login = useCallback(
    (email: string, password: string): Promise<SessionUser> => {
      if (!email || !password) {
        return Promise.reject(new Error("Email and password are required."));
      }
      const session = createSession(email);
      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setState((prev) => ({ ...prev, user: session }));
      return Promise.resolve(session);
    },
    [],
  );

  const logout = useCallback((): void => {
    globalThis.localStorage.removeItem(STORAGE_KEY);
    setState((prev) => ({ ...prev, user: null }));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, login, logout }),
    [state, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return ctx;
}
