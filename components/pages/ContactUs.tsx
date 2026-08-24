"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { COMPANY } from "@/lib/siteData";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function ContactUs() {
  useSEO({
    title: "Get a Free Moving Quote | On The Go Moving & Storage",
    description: "Get a free moving quote from On The Go Moving & Storage. Serving Seattle, Bellevue, Redmond & the Eastside. Call (425) 761-8500, response within 1 hour.",
    canonical: "https://onthegomoving.com/contact-us/",
    ogType: "website",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://onthegomoving.com/" },
          { "@type": "ListItem", position: 2, name: "Contact Us", item: "https://onthegomoving.com/contact-us/" },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">
        {/* Hero */}
        <section className="py-14" style={{ backgroundColor: "#1e3a0f" }}>
          <div className="container text-center">
            <p className="section-label text-[#75aa11] mb-2">Get In Touch</p>
            <h1 className="text-5xl font-extrabold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Contact On The Go Moving
            </h1>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">
              Ready to get started? Fill out the form below or give us a call. We respond to all quote requests within 1 business hour.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#f5f5f3]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <a href={COMPANY.phoneHref} className="flex items-center gap-3 text-gray-700 hover:text-[#75aa11] transition-colors">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8f4d0" }}>
                        <Phone size={18} style={{ color: "#75aa11" }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Phone</div>
                        <div className="font-bold">{COMPANY.phone}</div>
                      </div>
                    </a>
                    <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-gray-700 hover:text-[#75aa11] transition-colors">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8f4d0" }}>
                        <Mail size={18} style={{ color: "#75aa11" }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Email</div>
                        <div className="font-bold">{COMPANY.email}</div>
                      </div>
                    </a>
                    {/* Locations */}
                    <div className="pt-1">
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
                        <MapPin size={14} style={{ color: "#75aa11" }} />
                        Our Locations
                      </div>
                      <div className="space-y-3">
                        {/* Redmond — Primary */}
                        <div className="bg-white rounded-lg p-3 border border-[#75aa11]/30 shadow-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-bold text-gray-900 text-sm">Redmond <span className="text-[10px] font-semibold text-white bg-[#75aa11] rounded px-1.5 py-0.5 ml-1">HQ</span></div>
                              <div className="text-sm text-gray-600 mt-0.5">16625 Redmond Way #M365</div>
                              <div className="text-sm text-gray-600">Redmond, WA 98052</div>
                            </div>
                            <a
                              href="https://maps.google.com/?q=16625+Redmond+Way+%23M365+Redmond+WA+98052"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#75aa11] hover:underline shrink-0 mt-0.5"
                            >
                              Directions
                            </a>
                          </div>
                        </div>
                        {/* Seattle */}
                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-bold text-gray-900 text-sm">Seattle</div>
                              <div className="text-sm text-gray-600 mt-0.5">4024 13th Ave W</div>
                              <div className="text-sm text-gray-600">Seattle, WA 98119</div>
                            </div>
                            <a
                              href="https://maps.google.com/?q=4024+13th+Ave+W+Seattle+WA+98119"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#75aa11] hover:underline shrink-0 mt-0.5"
                            >
                              Directions
                            </a>
                          </div>
                        </div>
                        {/* Bellevue */}
                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-bold text-gray-900 text-sm">Bellevue</div>
                              <div className="text-sm text-gray-600 mt-0.5">4010 140th Ave SE</div>
                              <div className="text-sm text-gray-600">Bellevue, WA 98006</div>
                            </div>
                            <a
                              href="https://maps.google.com/?q=4010+140th+Ave+SE+Bellevue+WA+98006"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#75aa11] hover:underline shrink-0 mt-0.5"
                            >
                              Directions
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8f4d0" }}>
                        <Clock size={18} style={{ color: "#75aa11" }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Hours</div>
                        <div className="font-bold text-sm">Every day: 7am–7pm</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}>
                    License &amp; Credentials
                  </h3>
                  <p className="text-sm text-gray-500">WA License: <span className="font-mono font-bold text-gray-700">{COMPANY.license}</span></p>
                  <p className="text-sm text-gray-500 mt-1">USDOT#: <span className="font-mono font-bold text-gray-700">{COMPANY.usdot}</span></p>
                </div>
              </div>

              {/* Quote form */}
              <div className="lg:col-span-2">
                <QuoteForm variant="inline" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
