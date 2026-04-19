"use client";

import { useRouter } from "next/navigation";
import {
  Children,
  isValidElement,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Section } from "@/content/sections";
import { ThreadMessage } from "@/core/components/gmail/thread-message";

export function ThreadMessages({
  section,
  children,
  prevSlug,
  nextSlug,
  backHref = "/",
}: {
  section: Section;
  children: ReactNode;
  prevSlug: string | null;
  nextSlug: string | null;
  backHref?: string;
}) {
  const router = useRouter();
  const slides = extractSlides(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      slideRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (nextSlug) {
      router.push(`/emails/${nextSlug}`);
    }
  }, [currentIndex, slides.length, nextSlug, router]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      const prev = currentIndex - 1;
      setCurrentIndex(prev);
      slideRefs.current[prev]?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (prevSlug) {
      router.push(`/emails/${prevSlug}`);
    } else {
      router.push(backHref);
    }
  }, [currentIndex, prevSlug, backHref, router]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") router.push(backHref);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, backHref, router]);

  if (slides.length === 0) {
    return (
      <ThreadMessage
        sender={section.sender}
        senderEmail={section.senderEmail}
        timestamp={section.date}
        defaultExpanded
      >
        {children}
      </ThreadMessage>
    );
  }

  return (
    <>
      {slides.map((slide, i) => (
        <div
          key={i} // biome-ignore lint/suspicious/noArrayIndexKey: no other key
          ref={(el) => { slideRefs.current[i] = el; }}
        >
          <ThreadMessage
            sender={slide.sender ?? section.sender}
            senderEmail={section.senderEmail}
            timestamp={slide.timestamp ?? section.date}
            expanded={i <= currentIndex}
            onToggle={() => setCurrentIndex(i)}
          >
            {slide.children}
          </ThreadMessage>
        </div>
      ))}
    </>
  );
}

interface SlideData {
  sender?: string;
  timestamp?: string;
  children: ReactNode;
}

function extractSlides(node: ReactNode): SlideData[] {
  const slides: SlideData[] = [];

  function walk(n: ReactNode) {
    if (!isValidElement(n)) return;

    const props = n.props as Record<string, unknown>;

    if (props["data-slide"] !== undefined) {
      slides.push({
        sender: props["data-sender"] as string | undefined,
        timestamp: props["data-timestamp"] as string | undefined,
        children: props.children as ReactNode,
      });
      return;
    }

    if (props.children) {
      Children.forEach(props.children as ReactNode, walk);
    }
  }

  Children.forEach(node, walk);
  return slides;
}
