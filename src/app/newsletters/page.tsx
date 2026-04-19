import Link from "next/link";
import { newsletters } from "@/app/newsletters/newsletters";
import { Avatar } from "@/core/components/gmail/avatar";

export default function NewslettersPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderBottom: "1px solid var(--border-primary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            style={{ width: 18, height: 18, accentColor: "var(--accent)" }}
            readOnly
          />
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            borderRadius: 4,
            backgroundColor: "#d3e3fd",
            color: "#001d35",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 6H12l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
          </svg>
          Newsletter
        </div>
      </div>
      {newsletters.map((newsletter) => (
        <Link
          key={newsletter.slug}
          href={`/newsletters/${newsletter.slug}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 16px",
            textDecoration: "none",
            color: "inherit",
            backgroundColor: "var(--bg-inbox-row-unread)",
            borderBottom: "1px solid var(--border-light)",
            cursor: "pointer",
            minHeight: 44,
          }}
        >
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-tertiary)"
              strokeWidth={2}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <Avatar name="César Alberca" size={28} imageUrl="/me-squared.png" />
          </div>
          <div
            style={{
              width: 180,
              flexShrink: 0,
              fontWeight: 700,
              fontSize: 14,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            César Alberca
          </div>
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              gap: 4,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {newsletter.title}
            </span>
            <span
              style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              — {newsletter.description}
            </span>
          </div>
          <div
            style={{
              flexShrink: 0,
              fontSize: 12,
              color: "var(--text-primary)",
              fontWeight: 700,
            }}
          >
            {newsletter.date}
          </div>
        </Link>
      ))}
    </div>
  );
}
