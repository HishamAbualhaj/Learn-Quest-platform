import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/index.css";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
export const metadata: Metadata = {
  title: "Learn Quest",
  description: "E-learning platform",
};
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={montserrat.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
