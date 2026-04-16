"use client";

import { Children, isValidElement } from "react";
import { ThreadMessage } from "@/components/gmail/thread-message";
import type { Section } from "@/content/sections";

export function ThreadMessages({
  section,
  children,
}: {
  section: Section;
  children: React.ReactNode;
}) {
  const slides = extractSlides(children);

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
        <ThreadMessage
          // biome-ignore lint/suspicious/noArrayIndexKey: no other key
          key={i}
          sender={slide.sender ?? section.sender}
          senderEmail={section.senderEmail}
          timestamp={slide.timestamp ?? section.date}
          defaultExpanded={i === 0}
        >
          {slide.children}
        </ThreadMessage>
      ))}
    </>
  );
}

interface SlideData {
  sender?: string;
  timestamp?: string;
  children: React.ReactNode;
}

function extractSlides(node: React.ReactNode): SlideData[] {
  const slides: SlideData[] = [];

  function walk(n: React.ReactNode) {
    if (!isValidElement(n)) return;

    const props = n.props as Record<string, unknown>;

    if (props["data-slide"] !== undefined) {
      slides.push({
        sender: props["data-sender"] as string | undefined,
        timestamp: props["data-timestamp"] as string | undefined,
        children: props.children as React.ReactNode,
      });
      return;
    }

    if (props.children) {
      Children.forEach(props.children as React.ReactNode, walk);
    }
  }

  Children.forEach(node, walk);
  return slides;
}
