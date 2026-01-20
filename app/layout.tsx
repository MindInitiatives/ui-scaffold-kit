import { Toaster } from "sonner";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { Roboto, DM_Sans } from "next/font/google";

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: "UI Scaffold",
  description: "Generate scalable frontend project architectures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClassName = `${roboto.variable} ${sans.variable}`;

  return (
    <html lang="en">
      <body className={`${bodyClassName} bg-slate-950 text-slate-100 antialiased`}>
        <AppShell>{children}</AppShell>
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
