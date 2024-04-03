import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import ThemeProvider from "@/components/Theme";
import { ZustandProvider } from "@/components/Provider/ZustandProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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
          <div className="bg-background h-screen w-full overflow-x-auto relative">
            <ZustandProvider>
              <Header />
              <main className="px-6 py-12 h-[calc(100vh-65px-56px)] max-w-screen-xl m-auto w-full box-border">
                {children}
              </main>
              <Footer />
            </ZustandProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
