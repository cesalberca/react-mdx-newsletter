"use client";

import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { useCompose } from "@/core/context/compose-context";
import { cn } from "@/core/styles/cn";
import { env } from "@/lib/env";

type Corner = "bottom-right" | "bottom-left" | "top-right" | "top-left";

const CORNER_CLASSES: Record<Corner, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-[calc(var(--header-height)+1rem)] right-4",
  "top-left": "top-[calc(var(--header-height)+1rem)] left-4",
};

interface DragState {
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  moved: boolean;
}

const DRAG_THRESHOLD = 4;

export function QrCodeWidget() {
  const { isComposeOpen } = useCompose();
  const [corner, setCorner] = useState<Corner>("bottom-left");
  const [drag, setDrag] = useState<DragState | null>(null);
  const suppressClick = useRef(false);

  if (isComposeOpen) return null;

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({
      startX: e.clientX,
      startY: e.clientY,
      dx: 0,
      dy: 0,
      moved: false,
    });
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    setDrag((d) => {
      if (!d) return d;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      const moved = d.moved || Math.hypot(dx, dy) > DRAG_THRESHOLD;
      return { ...d, dx, dy, moved };
    });
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag) return;
    if (drag.moved) {
      // Dragged: snap to nearest corner, swallow the click on the links.
      suppressClick.current = true;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setCorner(
        e.clientY < cy
          ? e.clientX < cx
            ? "top-left"
            : "top-right"
          : e.clientX < cx
            ? "bottom-left"
            : "bottom-right",
      );
    }
    setDrag(null);
  }

  function handleClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    }
  }

  return (
    <div
      className={cn(
        "hidden md:flex fixed bg-card rounded-xl p-3 shadow-md flex-col items-center gap-2 z-[900] touch-none",
        CORNER_CLASSES[corner],
        drag?.moved ? "cursor-grabbing select-none" : "cursor-grab",
      )}
      style={
        drag
          ? {
              transform: `translate(${drag.dx}px, ${drag.dy}px)`,
              transition: "none",
            }
          : { transition: "transform 0.15s ease" }
      }
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClickCapture={handleClickCapture}
    >
      <a href="/newsletter" className="contents" draggable={false}>
        <QRCodeSVG value={`${env.NEXT_PUBLIC_URL}/newsletter`} size={100} />
      </a>
      <a
        href="/newsletter"
        className="text-[11px] text-muted-foreground font-medium no-underline"
        draggable={false}
      >
        Scan or click to subscribe
      </a>
    </div>
  );
}
