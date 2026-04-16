import { spamSections } from "@/content/sections";
import { InboxRow } from "@/core/components/gmail/inbox-row";

export default function SpamPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          margin: "8px 16px",
          borderRadius: 8,
          backgroundColor: "#fff3cd",
          color: "#856404",
          fontSize: 14,
          border: "1px solid #ffc107",
        }}
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#e6a200"
          style={{ flexShrink: 0 }}
        >
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
        <span>
          <strong>Warning:</strong> Messages in this folder have been identified
          as spam. Be careful with links and attachments.
        </span>
      </div>
      {spamSections.map((section) => (
        <InboxRow key={section.slug} section={section} />
      ))}
    </div>
  );
}
