import Image from "next/image";

const COLORS = [
  "#1a73e8",
  "#e8710a",
  "#137333",
  "#b31412",
  "#8430ce",
  "#007b83",
  "#c5221f",
  "#1967d2",
];

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

const CESAR_IMAGE = "/me-squared.png";

export function Avatar({
  name,
  size = 32,
  imageUrl,
}: {
  name: string;
  size?: number;
  imageUrl?: string;
}) {
  const resolvedImage =
    imageUrl ?? (name.startsWith("César") ? CESAR_IMAGE : undefined);

  if (resolvedImage) {
    return (
      <Image
        src={resolvedImage}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const bg = COLORS[hashCode(name) % COLORS.length];

  return (
    <div
      className="rounded-full flex items-center justify-center text-foreground-inverse font-medium shrink-0 select-none"
      style={{ width: size, height: size, backgroundColor: bg, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}
