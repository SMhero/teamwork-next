import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import ThemeProvider from "@/components/Theme";
import Header from "@/components/Header/Header";

import "./globals.css";

type Props = { children: React.ReactNode };

const inter = Ubuntu({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Teamwork - work by the right way.",
  description: "An application to help team leaders guide team members to the right way.",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <main className="bg-background h-screen w-full flex flex-col overflow-x-auto relative">
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
