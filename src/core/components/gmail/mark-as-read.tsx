"use client";

import { useEffect } from "react";
import { useReadStatus } from "@/core/context/read-status-context";

export function MarkAsRead({ slug }: { slug: string }) {
  const { markAsRead } = useReadStatus();

  useEffect(() => {
    markAsRead(slug);
  }, [slug, markAsRead]);

  return null;
}
