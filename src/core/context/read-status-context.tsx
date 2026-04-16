"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "readEmails";

interface ReadStatusContextValue {
  isRead: (slug: string) => boolean;
  markAsRead: (slug: string) => void;
  unreadSlugs: (slugs: string[]) => number;
}

const ReadStatusContext = createContext<ReadStatusContextValue | null>(null);

function loadReadSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {
    /* ignore corrupt data */
  }
  return new Set();
}

function persistReadSet(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function ReadStatusProvider({ children }: { children: ReactNode }) {
  const [readSet, setReadSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    setReadSet(loadReadSet());
  }, []);

  const isRead = useCallback((slug: string) => readSet.has(slug), [readSet]);

  const markAsRead = useCallback((slug: string) => {
    setReadSet((prev) => {
      if (prev.has(slug)) return prev;
      const next = new Set(prev);
      next.add(slug);
      persistReadSet(next);
      return next;
    });
  }, []);

  const unreadSlugs = useCallback(
    (slugs: string[]) => slugs.filter((s) => !readSet.has(s)).length,
    [readSet],
  );

  return (
    <ReadStatusContext.Provider value={{ isRead, markAsRead, unreadSlugs }}>
      {children}
    </ReadStatusContext.Provider>
  );
}

export function useReadStatus() {
  const ctx = useContext(ReadStatusContext);
  if (!ctx)
    throw new Error("useReadStatus must be used within ReadStatusProvider");
  return ctx;
}
