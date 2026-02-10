import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-context"
import { ComposeProvider } from "@/lib/compose-context"
import { ReadStatusProvider } from "@/lib/read-status-context"
import { Sidebar } from "@/components/gmail/sidebar"
import { SearchBar } from "@/components/gmail/search-bar"
import { ComposeDialog } from "@/components/gmail/compose-dialog"
import { QrCodeWidget } from "@/components/gmail/qr-code-widget"

export const metadata: Metadata = {
  title: "FWD: Urgent Opportunity to Claim Your React + MDX Newsletter Inheritance",
  description: "A Gmail-themed presentation about building newsletters with MDX, React Email, and Resend",
}

const ANTI_FOUC_SCRIPT = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANTI_FOUC_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <ReadStatusProvider>
          <ComposeProvider>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
              <SearchBar />
              <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                <Sidebar />
                <main style={{ flex: 1, overflow: "auto" }}>
                  {children}
                </main>
              </div>
            </div>
            <ComposeDialog />
            <QrCodeWidget />
          </ComposeProvider>
          </ReadStatusProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
