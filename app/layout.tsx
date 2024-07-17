import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "@/lib/SWRProvider";
import { ApolloWrapper } from "@/app/ApolloProvider";
import { Header } from "@/components/Header";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "MovieFindr",
  description:
    "A take home coding exercise showing off my skills as a software engineer!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <ApolloWrapper>
          <SWRProvider>
            <Header />
            <div>{children}</div>
          </SWRProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
