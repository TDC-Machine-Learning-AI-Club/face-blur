import { Toaster } from "react-hot-toast";
import { fontMono, fontSans } from "@/lib/fonts";

import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: "Face Blur AI",
    template: `%s | Face Blur AI`,
  },
  description: "An AI that blurs faces in images",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Toaster />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            {/* @ts-ignore */}
            <Header />
            <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
