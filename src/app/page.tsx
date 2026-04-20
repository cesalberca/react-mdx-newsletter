import { inboxSections } from "@/content/sections";
import { cn } from "@/core/styles/cn";
import { InboxRow } from "@/core/components/gmail/inbox-row";

export default function InboxPage() {
  return (
    <div className="bg-background min-h-full">
      <div className="flex items-center gap-4 py-2 px-4 border-b border-border">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-[18px] h-[18px] accent-accent"
            readOnly
          />
        </div>
        <div className="flex gap-2">
          <TabButton label="Primary" active />
          <TabButton label="Promotions" />
          <TabButton label="Social" />
        </div>
      </div>
      {inboxSections.map((section) => (
        <InboxRow key={section.slug} section={section} />
      ))}
    </div>
  );
}

function TabButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "py-2 px-4 text-sm cursor-default border-b-[3px]",
        active
          ? "font-bold text-accent border-accent"
          : "font-normal text-muted-foreground border-transparent",
      )}
    >
      {label}
    </div>
  );
}
