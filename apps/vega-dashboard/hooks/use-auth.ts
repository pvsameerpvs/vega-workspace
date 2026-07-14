"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  isActive?: boolean;
};

let refreshPromise: Promise<any> | null = null;

async function tryRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");
  if (!refreshPromise) {
    refreshPromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    ).then((r) => {
      if (!r.ok) throw new Error("Refresh failed");
      return r.json();
    });
  }
  const res = await refreshPromise;
  localStorage.setItem("token", res.token);
  return res;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");
    if (!token || !stored) {
      setIsLoading(false);
      return;
    }
    try {
      setUser(JSON.parse(stored));
      await api.me();
    } catch {
      try {
        await tryRefreshToken();
        const refreshed = localStorage.getItem("user");
        if (refreshed) setUser(JSON.parse(refreshed));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    localStorage.setItem("token", res.token);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.user));
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  const isAuthenticated = !!user;

  return { user, isAuthenticated, isLoading, login, logout };
}
