const COLORS = [
  "#1a73e8", "#e8710a", "#137333", "#b31412",
  "#8430ce", "#007b83", "#c5221f", "#1967d2",
]

function hashCode(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
  const bg = COLORS[hashCode(name) % COLORS.length]

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.4,
        fontWeight: 500,
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  )
}
