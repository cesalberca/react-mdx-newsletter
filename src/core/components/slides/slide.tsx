import type { ReactNode } from "react";

export function Slide({
  children,
  sender,
  timestamp,
}: {
  children: ReactNode;
  sender?: string;
  timestamp?: string;
}) {
  return (
    <div data-slide data-sender={sender} data-timestamp={timestamp}>
      {children}
    </div>
  );
}
