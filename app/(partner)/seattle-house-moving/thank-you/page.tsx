import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seattle House Quote Request Received | On The Go Moving",
  robots: { index: false, follow: false },
};

export default function SeattleHouseThankYouPage() {
  return (
    <section className="bg-[#f7faf4] px-4 py-24 text-center">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#5d8e12]">Seattle House resident offer</p>
        <h1 className="mt-3 text-3xl font-extrabold text-[#16320e]">Your Quote Request Is Received</h1>
        <p className="mt-4 text-gray-600">Our team will review your moving details and follow up about your Seattle House resident discount.</p>
        <Link href="/seattle-house-moving/" className="mt-7 inline-flex rounded-xl bg-[#75aa11] px-5 py-3 font-bold text-white transition-colors hover:bg-[#5d8e12]">Back to Seattle House Moving</Link>
      </div>
    </section>
  );
}
