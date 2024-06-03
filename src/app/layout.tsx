import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import App from "@/components/App/App";
import ThemeProvider from "@/components/Theme";
import QueryProvider from "@/components/Provider/QueryProvider";

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

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-background h-screen w-full overflow-x-auto relative">
          <QueryProvider>
            <ThemeProvider>
              <App>{children}</App>
            </ThemeProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
