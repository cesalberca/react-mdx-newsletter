import type { MDXComponents } from "mdx/types"
import { Slide } from "@/components/slides/slide"

const components: MDXComponents = {
  Slide,
  h1: (props) => (
    <h1
      style={{
        fontSize: 28,
        fontWeight: 700,
        margin: "0 0 16px 0",
        color: "var(--text-primary)",
        lineHeight: 1.3,
      }}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      style={{
        fontSize: 22,
        fontWeight: 600,
        margin: "24px 0 12px 0",
        color: "var(--text-primary)",
        lineHeight: 1.3,
      }}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      style={{
        fontSize: 18,
        fontWeight: 600,
        margin: "20px 0 8px 0",
        color: "var(--text-primary)",
        lineHeight: 1.4,
      }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      style={{
        margin: "0 0 12px 0",
        lineHeight: 1.7,
        color: "var(--text-primary)",
      }}
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      style={{
        margin: "0 0 12px 0",
        paddingLeft: 24,
        lineHeight: 1.7,
      }}
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      style={{
        margin: "0 0 12px 0",
        paddingLeft: 24,
        lineHeight: 1.7,
      }}
      {...props}
    />
  ),
  li: (props) => (
    <li style={{ marginBottom: 4 }} {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      style={{
        borderLeft: "4px solid var(--accent)",
        margin: "12px 0",
        padding: "8px 16px",
        color: "var(--text-secondary)",
        backgroundColor: "var(--bg-tertiary)",
        borderRadius: "0 8px 8px 0",
      }}
      {...props}
    />
  ),
  a: (props) => (
    <a
      style={{ color: "var(--text-link)", textDecoration: "none" }}
      {...props}
    />
  ),
  strong: (props) => (
    <strong style={{ fontWeight: 700, color: "var(--text-primary)" }} {...props} />
  ),
  table: (props) => (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      style={{
        textAlign: "left",
        padding: "8px 12px",
        borderBottom: "2px solid var(--border-primary)",
        fontWeight: 600,
        color: "var(--text-primary)",
      }}
      {...props}
    />
  ),
  td: (props) => (
    <td
      style={{
        padding: "8px 12px",
        borderBottom: "1px solid var(--border-light)",
        color: "var(--text-primary)",
      }}
      {...props}
    />
  ),
  hr: () => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--border-primary)",
        margin: "16px 0",
      }}
    />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
