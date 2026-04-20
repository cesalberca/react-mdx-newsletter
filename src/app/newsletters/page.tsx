import Link from "next/link";
import { newsletters } from "@/app/newsletters/newsletters";
import { Avatar } from "@/core/components/gmail/avatar";

export default function NewslettersPage() {
  return (
    <div className="bg-background min-h-full">
      <div className="flex items-center gap-2 py-2 px-4 border-b border-border">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-[18px] h-[18px] accent-accent"
            readOnly
          />
        </div>
        <div className="inline-flex items-center gap-[6px] py-1 px-2 rounded bg-surface-active text-compose-foreground text-[13px] font-medium">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6H12l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
          </svg>
          Newsletter
        </div>
      </div>

      {newsletters.map((newsletter) => (
        <Link
          key={newsletter.slug}
          href={`/newsletters/${newsletter.slug}`}
          className="flex items-center gap-3 py-2 px-4 no-underline text-inherit bg-row-unread border-b border-border-faint cursor-pointer min-h-[44px]"
        >
          <div className="shrink-0 flex items-center gap-2">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-none stroke-subtle-foreground stroke-2"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <Avatar name="César Alberca" size={28} imageUrl="/me-squared.png" />
          </div>

          <div className="w-[180px] shrink-0 font-bold text-sm truncate">
            César Alberca
          </div>

          <div className="flex-1 overflow-hidden flex gap-1 min-w-0">
            <span className="font-bold text-sm shrink-0">{newsletter.title}</span>
            <span className="text-muted-foreground text-sm truncate">
              — {newsletter.description}
            </span>
          </div>

          <div className="shrink-0 text-xs text-foreground font-bold">
            {newsletter.date}
          </div>
        </Link>
      ))}
    </div>
  );
}
