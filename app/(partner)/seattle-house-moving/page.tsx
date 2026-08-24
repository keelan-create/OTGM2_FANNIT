import type { Metadata } from "next";
import SeattleHouseLanding from "@/components/pages/landing/SeattleHouseLanding";

export const metadata: Metadata = {
  title: "Seattle House Moving | On The Go Moving",
  description: "Seattle House residents can request a moving quote and ask about their resident discount with On The Go Moving.",
  alternates: { canonical: "https://onthegomoving.com/seattle-house-moving/" },
  robots: { index: false, follow: true },
};

export default function SeattleHouseMovingPage() {
  return <SeattleHouseLanding />;
}
