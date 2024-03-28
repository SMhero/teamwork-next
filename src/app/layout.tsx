import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import ThemeProvider from "@/components/Theme";
import { ZustandProvider } from "@/components/Provider/ZustandProvider";
import Header from "@/components/Header/Header";

import "./globals.css";

type Props = { children: React.ReactNode };

const inter = Quantico({
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400", "700"],
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
            <ZustandProvider>
              <Header />
              <section className="flex min-h-screen flex-col items-center px-8 py-16 max-w-screen-desktop m-auto w-full">
                {children}
              </section>
            </ZustandProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
