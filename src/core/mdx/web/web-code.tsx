export function WebCode({
  children,
  ...props
}: {
  children: string;
  className?: string;
}) {
  return (
    <code
      style={{
        backgroundColor: "var(--bg-tertiary)",
        borderRadius: 4,
        padding: "2px 6px",
        fontFamily: '"Roboto Mono", monospace',
        fontSize: "0.875em",
      }}
      {...props}
    >
      {children}
    </code>
  );
}
