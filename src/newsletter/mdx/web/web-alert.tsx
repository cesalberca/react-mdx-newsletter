import {
  AlertCircle,
  Info,
  Lightbulb,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";
import {
  Children,
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";

// --- types ---

type AlertType = "note" | "tip" | "important" | "warning" | "caution";

// --- parse admonition ---

function transformChildrenToString(children: ReactNode | ReactNode[]): string {
  if (!Array.isArray(children) && !isValidElement(children)) {
    return childToString(children);
  }
  return Children.toArray(children).reduce((text: string, child: ReactNode) => {
    let newText = "";
    if (hasChildren(child)) {
      newText = transformChildrenToString(child.props.children);
    } else if (isValidElement(child)) {
      newText = "";
    } else {
      newText = childToString(child);
    }
    return text.concat(newText);
  }, "");
}

function childToString(child?: ReactNode): string {
  if (
    typeof child === "undefined" ||
    child === null ||
    typeof child === "boolean"
  )
    return "";
  if (JSON.stringify(child) === "{}") return "";
  return child.toString();
}

function hasChildren(
  element: ReactNode,
): element is ReactElement<{ children: ReactNode | ReactNode[] }> {
  return (
    isValidElement<{ children?: ReactNode[] }>(element) &&
    Boolean(element.props.children)
  );
}

function parseAdmonition(
  allText: string,
): { type: AlertType; content: string } | null {
  const match = allText.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i);
  if (!match?.[1]) return null;
  const kind = match[1].toUpperCase() as Uppercase<AlertType>;
  const map: Record<Uppercase<AlertType>, AlertType> = {
    NOTE: "note",
    TIP: "tip",
    IMPORTANT: "important",
    WARNING: "warning",
    CAUTION: "caution",
  };
  return { type: map[kind], content: allText.slice(match[0].length).trim() };
}

function stripPrefix(text: string): string {
  return text.replace(/^\s*\[![A-Za-z]+\]\s*/, "");
}

function cleanPrefix(children: ReactNode): ReactNode {
  const array = Children.toArray(children) as ReactNode[];
  let cleanedFirst = false;
  const newChildren: ReactNode[] = array.map((node): ReactNode => {
    if (!cleanedFirst && typeof node === "string") {
      cleanedFirst = true;
      return stripPrefix(node);
    }
    if (isValidElement(node)) {
      const element = node as ReactElement<{ children?: ReactNode }>;
      const elementChildren = element.props.children;
      if (!elementChildren) return element;
      return cloneElement(element, { children: cleanPrefix(elementChildren) });
    }
    return node;
  });
  return newChildren.length === 1 ? newChildren[0] : newChildren;
}

// --- alert config ---

const alertConfig: Record<
  AlertType,
  {
    icon: typeof Info;
    borderColor: string;
    bgColor: string;
    iconColor: string;
  }
> = {
  note: {
    icon: Info,
    borderColor: "#3b82f6",
    bgColor: "rgba(59,130,246,0.08)",
    iconColor: "#3b82f6",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "#10b981",
    bgColor: "rgba(16,185,129,0.08)",
    iconColor: "#10b981",
  },
  important: {
    icon: AlertCircle,
    borderColor: "#a855f7",
    bgColor: "rgba(168,85,247,0.08)",
    iconColor: "#a855f7",
  },
  warning: {
    icon: TriangleAlert,
    borderColor: "#f59e0b",
    bgColor: "rgba(245,158,11,0.08)",
    iconColor: "#f59e0b",
  },
  caution: {
    icon: OctagonAlert,
    borderColor: "#ef4444",
    bgColor: "rgba(239,68,68,0.08)",
    iconColor: "#ef4444",
  },
};

// --- component ---

export function WebAlert({ children }: HTMLQuoteElement & PropsWithChildren) {
  const allText = transformChildrenToString(children).trim();
  const parsed = parseAdmonition(allText);

  if (!parsed) {
    return (
      <blockquote
        style={{
          borderLeft: "4px solid var(--accent)",
          margin: "12px 0",
          padding: "8px 16px",
          color: "var(--text-secondary)",
          backgroundColor: "var(--bg-tertiary)",
          borderRadius: "0 8px 8px 0",
        }}
      >
        {children}
      </blockquote>
    );
  }

  const cfg = alertConfig[parsed.type];
  const Icon = cfg.icon;

  return (
    <div style={{ position: "relative", marginTop: 24, marginBottom: 32 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          width: 40,
          borderRadius: 8,
          border: `2px solid ${cfg.borderColor}`,
          backgroundColor: "var(--bg-primary, #fff)",
          color: cfg.iconColor,
        }}
      >
        <Icon size={18} />
      </div>
      <div
        style={{
          borderLeft: `2px solid ${cfg.borderColor}`,
          borderRadius: 8,
          padding: "16px 24px",
          backgroundColor: cfg.bgColor,
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--text-primary)",
        }}
      >
        {cleanPrefix(children)}
      </div>
    </div>
  );
}
