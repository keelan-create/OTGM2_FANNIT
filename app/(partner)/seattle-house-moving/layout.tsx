"use client";

import HeaderLanding from "@/components/layout/HeaderLanding";
import FooterLanding from "@/components/layout/FooterLanding";
import { COMPANY } from "@/lib/siteData";
import { pushPhoneClickEvent } from "@/components/QuoteForm";
import { Phone } from "lucide-react";

export default function SeattleHouseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderLanding />
      <main className="flex-1 pb-20 sm:pb-0">{children}</main>
      <FooterLanding />
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg sm:hidden">
        <div className="flex gap-2 px-4 py-3">
          <a href={COMPANY.phoneHref} onClick={() => pushPhoneClickEvent("seattle-house-mobile-sticky")} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#16320e] py-3 text-sm font-bold text-white"><Phone size={15} /> {COMPANY.phone}</a>
          <a href="#quote-form" className="flex flex-1 items-center justify-center rounded-lg bg-[#75aa11] py-3 text-sm font-bold text-white">Get Quote</a>
        </div>
      </div>
    </div>
  );
}
