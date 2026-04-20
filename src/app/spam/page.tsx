import { spamSections } from "@/content/sections";
import { InboxRow } from "@/core/components/gmail/inbox-row";

export default function SpamPage() {
  return (
    <div className="bg-background min-h-full">
      <div className="flex items-center gap-[10px] py-[10px] px-4 mx-4 mt-2 rounded-lg bg-[#fff3cd] text-[#856404] text-sm border border-[#ffc107]">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#e6a200"
          className="shrink-0"
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
