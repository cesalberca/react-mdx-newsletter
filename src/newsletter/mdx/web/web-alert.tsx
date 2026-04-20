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
import { cn } from "@/core/styles/cn";

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
    borderClass: string;
    bgClass: string;
    iconClass: string;
  }
> = {
  note: {
    icon: Info,
    borderClass: "border-blue-500",
    bgClass: "bg-blue-500/8",
    iconClass: "text-blue-500",
  },
  tip: {
    icon: Lightbulb,
    borderClass: "border-emerald-500",
    bgClass: "bg-emerald-500/8",
    iconClass: "text-emerald-500",
  },
  important: {
    icon: AlertCircle,
    borderClass: "border-purple-500",
    bgClass: "bg-purple-500/8",
    iconClass: "text-purple-500",
  },
  warning: {
    icon: TriangleAlert,
    borderClass: "border-amber-400",
    bgClass: "bg-amber-400/8",
    iconClass: "text-amber-400",
  },
  caution: {
    icon: OctagonAlert,
    borderClass: "border-red-500",
    bgClass: "bg-red-500/8",
    iconClass: "text-red-500",
  },
};

// --- component ---

export function WebAlert({ children }: HTMLQuoteElement & PropsWithChildren) {
  const allText = transformChildrenToString(children).trim();
  const parsed = parseAdmonition(allText);

  if (!parsed) {
    return (
      <blockquote className="border-l-4 border-accent my-3 py-2 px-4 text-muted-foreground bg-surface-raised rounded-r-lg">
        {children}
      </blockquote>
    );
  }

  const cfg = alertConfig[parsed.type];
  const Icon = cfg.icon;

  return (
    <div className="relative mt-6 mb-8">
      <div
        className={cn(
          "absolute left-0 top-0 -translate-x-1/2 flex items-center justify-center h-10 w-10 rounded-lg border-2 bg-background",
          cfg.borderClass,
          cfg.iconClass,
        )}
      >
        <Icon size={18} />
      </div>
      <div
        className={cn(
          "border-l-2 rounded-lg py-4 px-6 text-sm leading-[1.6] text-foreground",
          cfg.borderClass,
          cfg.bgClass,
        )}
      >
        {cleanPrefix(children)}
      </div>
    </div>
  );
}
