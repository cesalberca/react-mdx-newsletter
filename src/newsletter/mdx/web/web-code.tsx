import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/synthwave84";
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
        style={{
          display: "block",
          padding: "16px",
          backgroundColor: "var(--bg-tertiary, #f5f5f5)",
          color: "var(--text-primary)",
          fontSize: 13,
          fontFamily: '"Roboto Mono", ui-monospace, monospace',
          lineHeight: 1.6,
          overflowX: "auto",
        }}
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
        "bg-muted px-[4px] py-[2px] mx-[2px] rounded not-prose font-mono",
      )}
      style={{
        borderRadius: 4,
        padding: "2px 6px",
        fontFamily: '"Roboto Mono", monospace',
        fontSize: "0.875em",
      }}
    >
      {children}
    </code>
  );
}
