"use client";

import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const router = useRouter();
  const { isComposeOpen } = useCompose();
  const [corner, setCorner] = useState<Corner>("bottom-left");
  const [drag, setDrag] = useState<DragState | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const suppressClick = useRef(false);
  const downOnQr = useRef(false);
  const downOnLink = useRef(false);

  useEffect(() => {
    if (!isModalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isModalOpen]);

  if (isComposeOpen) return null;

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const target = e.target as HTMLElement;
    downOnQr.current = !!target.closest("[data-qr-trigger]");
    downOnLink.current = !!target.closest("[data-link-trigger]");
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
    } else if (downOnQr.current) {
      setIsModalOpen(true);
    } else if (downOnLink.current) {
      router.push("/newsletter");
    }
    downOnQr.current = false;
    downOnLink.current = false;
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
    <>
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
        <div data-qr-trigger className="cursor-pointer">
          <QRCodeSVG value={`${env.NEXT_PUBLIC_URL}/newsletter`} size={100} />
        </div>
        <a
          href="/newsletter"
          data-link-trigger
          className="text-[11px] text-muted-foreground font-medium underline"
          draggable={false}
        >
          Scan or click to subscribe
        </a>
      </div>
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-card rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <QRCodeSVG
                value={`${env.NEXT_PUBLIC_URL}/newsletter`}
                size={400}
              />
              <a
                href="/newsletter"
                className="text-sm text-muted-foreground font-medium no-underline hover:underline"
              >
                Scan or click to subscribe
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
