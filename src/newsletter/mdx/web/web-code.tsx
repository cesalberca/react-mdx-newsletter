import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/ghcolors";
import { cn } from "@/core/styles/cn";

export function WebCode({
  children,
  ...props
}: {
  children: string;
  className?: string;
}) {
  const className = props?.className ?? "";
  const match = /language-(\w+)/.exec(className);

  if (match) {
    return (
      <SyntaxHighlighter
        {...props}
        language={match[1]}
        CodeTag="div"
        PreTag="div"
        style={dark}
        customStyle={{ margin: 0, borderRadius: 0 }}
        codeTagProps={{ className: "font-mono" }}
      >
        {children}
      </SyntaxHighlighter>
    );
  }

  // Block plain code (inside <pre> via WebPre)
  if (typeof children === "string" && children.includes("\n")) {
    return (
      <code
        {...props}
        className={cn(
          className,
          "block p-4 bg-surface-raised text-foreground text-[13px] font-mono leading-[1.6] overflow-x-auto",
        )}
      >
        {children}
      </code>
    );
  }

  // Inline code
  return (
    <code
      {...props}
      className={cn(
        className,
        "bg-surface-raised px-1.5 py-0.5 mx-0.5 rounded text-[0.875em] font-mono not-prose",
      )}
    >
      {children}
    </code>
  );
}
