// ==========================================================================
// ON THE GO MOVING — Core service catalog (plain data, server-safe)
// Used by the /services/ hub page UI, its JSON-LD, and the HQ LocalBusiness
// hasOfferCatalog in lib/schema.ts. Every href is a live service page.
// ==========================================================================

export interface ServiceCatalogItem {
  title: string;
  href: string;
  description: string;
}

export const SERVICES_CATALOG: ServiceCatalogItem[] = [
  {
    title: "Residential Moving",
    href: "/residential-moving/",
    description:
      "Full-service home moves handled with care. From studio apartments to large family homes, our crews treat your belongings like their own.",
  },
  {
    title: "Commercial Moving",
    href: "/commercial-moving/",
    description:
      "Minimize downtime with efficient office and commercial relocation. We work around your schedule, evenings and weekends available.",
  },
  {
    title: "Storage Services",
    href: "/storage-services/",
    description:
      "Secure vaulted storage at our Redmond, WA facility. Dedicated vaults managed by our team, not a self-serve unit. Contact us for current pricing.",
  },
  {
    title: "Apartment Moving",
    href: "/apartment-moving/",
    description:
      "Studio to multi-bedroom apartment moves. We know Seattle and Eastside buildings, elevator reservations, COI requirements, and tight hallways are no problem.",
  },
  {
    title: "Senior Moving",
    href: "/senior-moving/",
    description:
      "Patient, careful service for seniors and families. We take the time to do it right, downsizing, assisted living transitions, and estate moves handled with respect.",
  },
  {
    title: "Staging Professionals",
    href: "/staging-professionals/",
    description:
      "Moving and storage services tailored for home stagers. Fast turnaround, flexible scheduling, and secure vault storage between staging projects.",
  },
  {
    title: "Packing Services",
    href: "/packing-services/",
    description:
      "Professional packing using quality materials, all supplies included. Full-pack, partial-pack, or fragile-only options available.",
  },
  {
    title: "Labor Only Moving",
    href: "/labor-only-moving/",
    description:
      "Need professional loading or unloading help? Our crews bring the same care and equipment as a full-service move, ask us about upgrading to a full-service truck for a small hourly increase.",
  },
  {
    title: "Furniture Moving",
    href: "/furniture-moving/",
    description:
      "Careful handling of sofas, dining sets, bedroom furniture, and antiques. Our crews use blankets, shrink wrap, and proper lifting techniques to protect every piece.",
  },
  {
    title: "Condo Moving",
    href: "/condo-moving/",
    description:
      "High-rise and mid-rise condo moves with COI documentation, elevator reservations, and loading dock coordination handled for you.",
  },
  {
    title: "Appliance Moving",
    href: "/appliance-moving/",
    description:
      "Safe transport of washers, dryers, refrigerators, and other heavy appliances. We use dollies and protective gear to prevent damage to floors and walls.",
  },
  {
    title: "Unpacking Services",
    href: "/unpacking-services/",
    description:
      "Let our crew unpack and organize your new home. We remove all packing materials and help you settle in faster \u2014 available same-day or next-day after your move.",
  },
  {
    title: "Warehousing & Distribution",
    href: "/warehousing-distribution/",
    description:
      "Short and long-term warehousing at our Redmond facility. Ideal for businesses needing inventory storage, staging, or distribution support in the Greater Seattle area.",
  },
  {
    title: "Office Moving",
    href: "/office-moving/",
    description:
      "Complete office relocation services \u2014 desks, workstations, server equipment, and filing systems moved efficiently to minimize business disruption.",
  },
  {
    title: "Corporate Relocation",
    href: "/corporate-relocation/",
    description:
      "End-to-end relocation management for businesses moving employees or entire departments. Coordinated logistics, flexible scheduling, and dedicated project management.",
  },
  {
    title: "Freight Forwarding",
    href: "/freight-forwarding-service/",
    description:
      "Reliable freight pickup, transport, and delivery for businesses and individuals. Our branded fleet handles oversized loads and time-sensitive freight across the Pacific Northwest.",
  },
];
