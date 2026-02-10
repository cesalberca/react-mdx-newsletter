import { sections } from "@/content/sections"
import { InboxRow } from "@/components/gmail/inbox-row"

export default function InboxPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "8px 16px",
          borderBottom: "1px solid var(--border-primary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} readOnly />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <TabButton label="Primary" active />
          <TabButton label="Promotions" />
          <TabButton label="Social" />
        </div>
      </div>
      {sections.map((section) => (
        <InboxRow key={section.slug} section={section} />
      ))}
    </div>
  )
}

function TabButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      style={{
        padding: "8px 16px",
        fontSize: 14,
        fontWeight: active ? 700 : 400,
        color: active ? "var(--accent)" : "var(--text-secondary)",
        borderBottom: active ? "3px solid var(--accent)" : "3px solid transparent",
        cursor: "default",
      }}
    >
      {label}
    </div>
  )
}
