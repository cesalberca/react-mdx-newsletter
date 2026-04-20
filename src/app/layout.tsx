import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { ComposeDialog } from "@/core/components/gmail/compose-dialog";
import { QrCodeWidget } from "@/core/components/gmail/qr-code-widget";
import { SearchBar } from "@/core/components/gmail/search-bar";
import { Sidebar } from "@/core/components/gmail/sidebar";
import { ComposeProvider } from "@/core/context/compose-context";
import { ReadStatusProvider } from "@/core/context/read-status-context";
import { ThemeProvider } from "@/core/context/theme-context";

export const metadata: Metadata = {
  title:
    "FWD: Urgent Opportunity to Claim Your React + MDX Newsletter Inheritance",
  description:
    "A Gmail-themed presentation about building newsletters with MDX, React Email, and Resend",
};

const ANTI_FOUC_SCRIPT = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: inline script to prevent flash of unstyled content before hydration */}
        <script dangerouslySetInnerHTML={{ __html: ANTI_FOUC_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ReadStatusProvider>
            <ComposeProvider>
              <div className="flex flex-col h-screen">
                <SearchBar />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-auto">{children}</main>
                </div>
              </div>
              <ComposeDialog />
              <QrCodeWidget />
            </ComposeProvider>
          </ReadStatusProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
