import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joshua Yu | Computer Science Student @ UofT Scarborough",
  description:
    "Joshua Yu is a Computer Science student at the University of Toronto Scarborough, passionate about building software and exploring new technologies.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:dark)",
        url: "images/favicon-dark.ico",
        href: "images/favicon-dark.ico",
      },
      {
        media: "(prefers-color-scheme:light)",
        url: "images/favicon-light.ico",
        href: "images/favicon-light.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="px-14 md:px-28 lg:px-40 xl:px-80 flex-1 text-left">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
