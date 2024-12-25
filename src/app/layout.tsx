import RootProviders from "@/components/Providers/RootProviders";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Tilt_Neon } from "next/font/google";

export const metadata: Metadata = {
  title: "Fintrack",
  description: "User friendly finance tracker",
};

const title_neon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body className={title_neon.className}>
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
