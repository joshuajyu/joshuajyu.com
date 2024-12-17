import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import "./globals.css";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Joshua Yu | Computer Science Student @ UofT Scarborough",
  description:
    "Joshua Yu is a Computer Science student at the University of Toronto Scarborough, passionate about building software and exploring new technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="px-14 sm:px-14 md:px-28 lg:px-40 xl:px-80 flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
