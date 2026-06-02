import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours — Seyyah Travel",
  description: "Explore our curated collection of boutique tours across Egypt, Switzerland, Europe, Morocco, Tunisia, and Algeria.",
};

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
