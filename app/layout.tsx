import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/providers/react-query.provider";

export const metadata: Metadata = {
  title: "DASA Stock Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body cz-shortcut-listen="true" className={`antialiased`}>
        <ReactQueryProvider>
          <Navbar />
          <main className="mt-12 max-w-6xl mx-auto">{children}</main>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
