"use client";

import QuoteForm, { pushPhoneClickEvent } from "@/components/QuoteForm";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { COMPANY } from "@/lib/siteData";
import seattleHouseDestinationModule from "@/lib/seattleHouseDestinations.js";
import { Building2, CheckCircle2, Clock3, Phone, ShieldCheck, Star, Truck } from "lucide-react";

const {
  SEATTLE_HOUSE_DESTINATIONS,
  SEATTLE_HOUSE_MOVE_SIZES,
  SEATTLE_HOUSE_MOVE_TYPES,
} = seattleHouseDestinationModule;

const TOWER_OPTIONS = Object.values(SEATTLE_HOUSE_DESTINATIONS).map(({ key, label }) => ({ value: key, label }));

const MOVE_TIME_RANGES = [
  { homeSize: "Studio", range: "2 to 4 hours" },
  { homeSize: "1 bedroom", range: "2 to 4 hours" },
  { homeSize: "2 bedrooms", range: "4 to 6 hours" },
];

export default function SeattleHouseLanding() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#16320e] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${BRAND_IMAGES.heroMovingCrew})` }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#75aa11] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              <Building2 size={14} /> Preferred Mover for Seattle House
            </div>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Moving Into <span className="text-[#a7d84b]">Seattle House?</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-100">
              Seattle House residents receive <strong>10% off eligible local moving services</strong> with On The Go Moving.
              Choose your tower, request a quote, and we will help you plan the details.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-100">
              <span className="flex items-center gap-2"><Star size={16} className="fill-[#fbc319] text-[#fbc319]" /> {COMPANY.googleRating} rating</span>
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#a7d84b]" /> Licensed and insured</span>
              <span className="flex items-center gap-2"><Truck size={16} className="text-[#a7d84b]" /> Local moving team</span>
            </div>
            <a
              href={COMPANY.phoneHref}
              onClick={() => pushPhoneClickEvent("seattle-house-hero")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-extrabold text-[#16320e] shadow-lg transition-colors hover:bg-gray-100"
            >
              <Phone size={18} /> {COMPANY.phone}
            </a>
          </div>

          <div id="quote-form" className="rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5d8e12]">Seattle House resident offer</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#16320e]">Claim Your Resident Discount</h2>
            <p className="mt-1 text-sm text-gray-600">Select your tower and get a free moving quote.</p>
            <div className="mt-4">
              <QuoteForm
                variant="inline"
                sourceLabel="partner-seattle-house"
                isLandingPage={true}
                thankYouPath="/seattle-house-moving/thank-you/"
                submitButtonLabel="Claim My Resident Discount"
                partnerDestinations={TOWER_OPTIONS}
                partnerMoveTypes={SEATTLE_HOUSE_MOVE_TYPES}
                partnerMoveSizes={SEATTLE_HOUSE_MOVE_SIZES}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-7 gap-y-3 px-4 text-sm text-gray-600">
          <span className="font-semibold text-[#16320e]">A simple move-in process</span>
          <span>Choose your tower</span>
          <span className="hidden text-[#75aa11] sm:inline">•</span>
          <span>Request your quote</span>
          <span className="hidden text-[#75aa11] sm:inline">•</span>
          <span>Confirm your move plan</span>
        </div>
      </section>

      <section className="bg-[#f7faf4] py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#5d8e12]">Plan your move day</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#16320e]">Typical Moving Time by Home Size</h2>
            <p className="mt-3 text-gray-600">These are planning ranges, not a guaranteed quote or schedule. Packing, access, elevator availability, item volume, and travel distance can change the final timeline.</p>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {MOVE_TIME_RANGES.map(({ homeSize, range }) => (
              <div key={homeSize} className="rounded-2xl border border-[#dfead2] bg-white p-6 text-center shadow-sm">
                <Clock3 className="mx-auto text-[#75aa11]" size={28} />
                <h3 className="mt-3 text-lg font-bold text-[#16320e]">{homeSize}</h3>
                <p className="mt-2 text-2xl font-extrabold text-[#5d8e12]">{range}</p>
                <p className="mt-1 text-sm text-gray-500">typical planning range</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <img
            src={BRAND_IMAGES.crewEntryway1}
            alt="On The Go Moving crew helping with a residential move"
            className="h-72 w-full rounded-2xl object-cover shadow-lg"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#5d8e12]">Make move day easier</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#16320e]">How to Prepare for Your Move</h2>
            <ul className="mt-6 space-y-4 text-gray-700">
              {[
                "Request your quote early and choose the North or South Tower in the form.",
                "Pack and label boxes by room, and keep important items with you.",
                "Confirm your preferred move date and share any access details with the moving team.",
                "Check with Seattle House management about any move-day requirements before your scheduled move.",
              ].map((item) => (
                <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 flex-shrink-0 text-[#75aa11]" size={19} /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#16320e] py-14 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-extrabold">Ready to Plan Your Seattle House Move?</h2>
          <p className="mt-3 text-gray-200">Request a free quote and ask about your Seattle House resident discount.</p>
          <a href="#quote-form" className="mt-6 inline-flex rounded-xl bg-[#fbc319] px-7 py-3.5 font-extrabold text-[#1a1a1a] transition-colors hover:bg-[#f5b800]">Claim My Resident Discount</a>
        </div>
      </section>
    </div>
  );
}
