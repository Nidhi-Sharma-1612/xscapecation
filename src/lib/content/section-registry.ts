export type ScalarFieldKind = "text" | "textarea" | "image" | "url" | "multilineList";

export type ScalarFieldDef = {
  key: string;
  label: string;
  kind: ScalarFieldKind;
};

export type CardListFieldDef = {
  key: string;
  label: string;
  kind: "cardList";
  itemLabel: string;
  itemFields: ScalarFieldDef[];
};

export type FieldDef = ScalarFieldDef | CardListFieldDef;

export type SectionDef = {
  key: string;
  pageSlug: string;
  name: string;
  fields: FieldDef[];
  defaultContent: Record<string, unknown>;
};

const title: ScalarFieldDef = { key: "title", label: "Title", kind: "text" };
const description: ScalarFieldDef = {
  key: "description",
  label: "Description",
  kind: "textarea",
};

export const SECTION_REGISTRY: SectionDef[] = [
  // ---- home ----
  {
    key: "hero",
    pageSlug: "home",
    name: "Hero Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Headline", kind: "text" },
      { key: "backgroundImage", label: "Background image", kind: "image" },
    ],
    defaultContent: {
      eyebrow: "Are you ready to...",
      heading: "Xscape the Ordinary",
      backgroundImage: "/images/hero-porch.jpg",
    },
  },
  {
    key: "cta",
    pageSlug: "home",
    name: "Call-to-Action Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "paragraph", label: "Paragraph", kind: "textarea" },
      { key: "primaryButtonText", label: "Button text", kind: "text" },
      { key: "primaryButtonUrl", label: "Button link", kind: "url" },
    ],
    defaultContent: {
      eyebrow: "Home Away From Home",
      heading: "Ready to Xscape?",
      paragraph:
        "Book direct for the best rate — no third-party fees, just a home that's ready when you are.",
      primaryButtonText: "Book Your Stay",
      primaryButtonUrl: "/book",
    },
  },

  // ---- about ----
  {
    key: "about-banner",
    pageSlug: "about",
    name: "Page Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "title", label: "Title", kind: "text" },
      { key: "image", label: "Banner image", kind: "image" },
      { key: "imageAlt", label: "Image alt text", kind: "text" },
    ],
    defaultContent: {
      eyebrow: "Home Away From Home",
      title: "About Us",
      image: "/images/properties/oasis-1/1.jpg",
      imageAlt: "Cozy living room at Xscapecation Oasis",
    },
  },
  {
    key: "about-intro",
    pageSlug: "about",
    name: "About Heading",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "subheading", label: "Subheading", kind: "textarea" },
    ],
    defaultContent: {
      eyebrow: "About Us",
      heading: "Welcome to Xscapecation Oasis",
      subheading:
        "A recently renovated villa in the heart of Tulsa, styled to feel like your own.",
    },
  },
  {
    key: "about-content",
    pageSlug: "about",
    name: "About Story",
    fields: [
      { key: "image", label: "Photo", kind: "image" },
      { key: "ratingText", label: "Rating badge text", kind: "text" },
      { key: "paragraph1", label: "Paragraph 1", kind: "textarea" },
      { key: "paragraph2", label: "Paragraph 2", kind: "textarea" },
      { key: "paragraph3", label: "Paragraph 3", kind: "textarea" },
      { key: "buttonText", label: "Button text", kind: "text" },
      { key: "buttonUrl", label: "Button link", kind: "url" },
    ],
    defaultContent: {
      image: "/images/property/bedroom.jpg",
      ratingText: "4.9 · Verified Reviews",
      paragraph1:
        "This air-conditioned retreat keeps you close to the action without sacrificing a quiet night's sleep.",
      paragraph2:
        "Inside, two comfortable bedrooms and a full kitchen make it easy to settle in, while the patio is the perfect spot for morning coffee or an evening glass of wine. Arriving guests are welcomed with a little something sweet.",
      paragraph3: "Once you're settled in, Tulsa's best is just minutes away.",
      buttonText: "Explore Tulsa",
      buttonUrl: "/explore",
    },
  },
  {
    key: "about-values",
    pageSlug: "about",
    name: "Why Book Direct",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      {
        key: "items",
        label: "Value cards",
        kind: "cardList",
        itemLabel: "Value",
        itemFields: [title, description],
      },
    ],
    defaultContent: {
      eyebrow: "Why Book Direct",
      heading: "No Middlemen, Just Us",
      items: [
        {
          title: "Best Rate, Guaranteed",
          description:
            "Book direct and skip the third-party service fees that come with other platforms.",
        },
        {
          title: "Direct Communication",
          description:
            "Reach us any time before, during, and after your stay — no call centers, no middlemen.",
        },
        {
          title: "Flexible Terms",
          description:
            "Need to adjust your dates or have a special request? We work with you directly.",
        },
      ],
    },
  },

  // ---- properties ----
  {
    key: "properties-banner",
    pageSlug: "properties",
    name: "Page Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "title", label: "Title", kind: "text" },
      { key: "image", label: "Banner image", kind: "image" },
      { key: "imageAlt", label: "Image alt text", kind: "text" },
    ],
    defaultContent: {
      eyebrow: "Where You'll Stay",
      title: "Properties",
      image: "/images/property/kitchen.jpg",
      imageAlt: "Kitchen at Xscapecation Oasis",
    },
  },
  {
    key: "steps",
    pageSlug: "properties",
    name: "How Booking Direct Works",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      {
        key: "items",
        label: "Steps",
        kind: "cardList",
        itemLabel: "Step",
        itemFields: [title, description],
      },
    ],
    defaultContent: {
      eyebrow: "Simple & Direct",
      heading: "How Booking Direct Works",
      items: [
        {
          title: "Pick Your Property",
          description:
            "Compare guests, bedrooms, and rates across all three homes to find your fit.",
        },
        {
          title: "Book Direct",
          description:
            "Reserve straight with us — the best rate, no third-party service fees.",
        },
        {
          title: "Pack Your Bags",
          description:
            "We'll handle the rest, from self check-in details to local tips.",
        },
      ],
    },
  },

  // ---- amenities ----
  {
    key: "amenities-banner",
    pageSlug: "amenities",
    name: "Page Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "title", label: "Title", kind: "text" },
      { key: "image", label: "Banner image", kind: "image" },
      { key: "imageAlt", label: "Image alt text", kind: "text" },
    ],
    defaultContent: {
      eyebrow: "Comfort, Covered",
      title: "Amenities",
      image: "/images/properties/oasis-1/2.jpg",
      imageAlt: "Cozy living room at Xscapecation Oasis",
    },
  },
  {
    key: "amenities-intro",
    pageSlug: "amenities",
    name: "Amenities Heading",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "subheading", label: "Subheading", kind: "textarea" },
    ],
    defaultContent: {
      eyebrow: "Comfort, Covered",
      heading: "Amenities",
      subheading: "Everything you need for a stay that feels like home.",
    },
  },
  {
    key: "amenities-grid",
    pageSlug: "amenities",
    name: "Amenity Highlights",
    fields: [
      {
        key: "items",
        label: "Amenity cards",
        kind: "cardList",
        itemLabel: "Amenity",
        itemFields: [
          title,
          description,
          { key: "image", label: "Photo", kind: "image" },
        ],
      },
    ],
    defaultContent: {
      items: [
        {
          title: "Self Check-In",
          description: "Skip the front desk — let yourself in on your schedule.",
          image: "/images/amenities/self-checkin.jpg",
        },
        {
          title: "Complimentary Wi-Fi",
          description: "Fast, reliable internet for streaming and remote work.",
          image: "/images/amenities/wifi.jpg",
        },
        {
          title: "Fresh Linens",
          description: "Hotel-quality bedding, washed and ready for every stay.",
          image: "/images/amenities/linens.jpg",
        },
        {
          title: "Hotel-Style Toiletries",
          description: "Little luxuries stocked in every bathroom.",
          image: "/images/amenities/toiletries.jpg",
        },
        {
          title: "Dedicated Office Space",
          description: "A quiet corner to stay productive while you travel.",
          image: "/images/amenities/office.jpg",
        },
        {
          title: "Fully Equipped Kitchen",
          description: "Everything you need to cook a real meal at home.",
          image: "/images/amenities/kitchen.jpg",
        },
      ],
    },
  },
  {
    key: "amenity-list",
    pageSlug: "amenities",
    name: "What's Included",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "paragraph", label: "Paragraph", kind: "textarea" },
      {
        key: "items",
        label: "Categories",
        kind: "cardList",
        itemLabel: "Category",
        itemFields: [
          { key: "title", label: "Category name", kind: "text" },
          {
            key: "items",
            label: "Items (one per line)",
            kind: "multilineList",
          },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "The Full List",
      heading: "What's Included",
      paragraph:
        "Every stay comes stocked with the essentials — and a few nice extras.",
      items: [
        {
          title: "Kitchen & Dining",
          items: [
            "Fully equipped kitchen",
            "Coffee maker",
            "Dishwasher",
            "Dining table for 6",
          ],
        },
        {
          title: "Comfort",
          items: [
            "Central air conditioning & heating",
            "Fresh, hotel-quality linens",
            "Hotel-style toiletries",
            "Washer & dryer",
          ],
        },
        {
          title: "Work & Connectivity",
          items: [
            "Complimentary Wi-Fi",
            "Dedicated office space",
            "Smart TV",
            "Self check-in",
          ],
        },
        {
          title: "Safety & Essentials",
          items: [
            "Smoke detector",
            "Carbon monoxide detector",
            "Fire extinguisher",
            "First aid kit",
          ],
        },
      ],
    },
  },

  // ---- review ----
  {
    key: "review-banner",
    pageSlug: "review",
    name: "Page Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "title", label: "Title", kind: "text" },
      { key: "image", label: "Banner image", kind: "image" },
      { key: "imageAlt", label: "Image alt text", kind: "text" },
    ],
    defaultContent: {
      eyebrow: "Guest Love",
      title: "Reviews",
      image: "/images/property/bedroom.jpg",
      imageAlt: "Bedroom at Xscapecation Oasis",
    },
  },
  {
    key: "review-stats",
    pageSlug: "review",
    name: "Review Stats",
    fields: [
      { key: "ratingValue", label: "Average rating", kind: "text" },
      { key: "ratingLabel", label: "Rating label", kind: "text" },
      { key: "staysValue", label: "Verified stays count", kind: "text" },
      { key: "staysLabel", label: "Stays label", kind: "text" },
    ],
    defaultContent: {
      ratingValue: "4.9",
      ratingLabel: "Average Rating",
      staysValue: "196",
      staysLabel: "Verified Stays",
    },
  },
  {
    key: "reviews",
    pageSlug: "review",
    name: "Guest Reviews",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "ratingText", label: "Rating summary text", kind: "text" },
      {
        key: "items",
        label: "Reviews",
        kind: "cardList",
        itemLabel: "Review",
        itemFields: [
          { key: "quote", label: "Quote", kind: "textarea" },
          { key: "name", label: "Guest name", kind: "text" },
          { key: "detail", label: "Detail (e.g. Verified Guest)", kind: "text" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Guest Love",
      heading: "Reviews",
      ratingText: "4.9 · 196 Verified Stays",
      items: [
        {
          quote:
            "The home was clean and comfortable. There were explanations of everything in a notebook on a desk. Free wifi, which the kids enjoyed. Good neighborhood also! The owner was nice and easy to get a hold of if I needed them.",
          name: "Jodi",
          detail: "Verified Guest",
        },
        {
          quote:
            "The host is absolutely precious and the home is so sweet — by far my favorite stay thus far. It was so cute and cozy, I hate I didn't stay longer.",
          name: "Angel",
          detail: "Verified Guest",
        },
        {
          quote:
            "Exactly like the photos — better, actually. Walking distance to campus made the whole trip so easy.",
          name: "Marcus",
          detail: "Verified Guest",
        },
        {
          quote:
            "Loved the porch in the mornings. Spotless, well-stocked kitchen, and quick to respond to every message.",
          name: "Priya",
          detail: "Verified Guest",
        },
        {
          quote:
            "Self check-in made a late arrival painless. The bed was incredibly comfortable and the kitchen had everything we needed.",
          name: "Devon",
          detail: "Verified Guest",
        },
        {
          quote:
            "Booked direct and it was a breeze. Would stay again for our next trip to Tulsa without a second thought.",
          name: "Sarah",
          detail: "Verified Guest",
        },
        {
          quote:
            "Quiet neighborhood, close to everything downtown, and the host was quick to answer every question we had.",
          name: "Anthony",
          detail: "Verified Guest",
        },
        {
          quote:
            "Private parking made unloading so easy, and the place was even better in person. Already planning our next visit.",
          name: "Renee",
          detail: "Verified Guest",
        },
      ],
    },
  },

  // ---- explore ----
  {
    key: "explore-banner",
    pageSlug: "explore",
    name: "Page Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "title", label: "Title", kind: "text" },
      { key: "image", label: "Banner image", kind: "image" },
      { key: "imageAlt", label: "Image alt text", kind: "text" },
    ],
    defaultContent: {
      eyebrow: "Beyond the Door",
      title: "Explore Tulsa",
      image: "/images/explore/gathering-place.jpg",
      imageAlt: "Gathering Place park in Tulsa",
    },
  },
  {
    key: "explore-intro",
    pageSlug: "explore",
    name: "Explore Heading",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "subheading", label: "Subheading", kind: "textarea" },
    ],
    defaultContent: {
      eyebrow: "Beyond the Door",
      heading: "Explore Tulsa",
      subheading:
        "A few of our favorite things to see and do near the property.",
    },
  },
  {
    key: "explore-cards",
    pageSlug: "explore",
    name: "Explore Highlights",
    fields: [
      {
        key: "items",
        label: "Places",
        kind: "cardList",
        itemLabel: "Place",
        itemFields: [
          title,
          { key: "category", label: "Category", kind: "text" },
          description,
          { key: "image", label: "Photo", kind: "image" },
          { key: "linkLabel", label: "Link text", kind: "text" },
          { key: "href", label: "Link URL", kind: "url" },
        ],
      },
    ],
    defaultContent: {
      items: [
        {
          title: "Gathering Place",
          category: "Culture & Recreation",
          description:
            "One of the country's top-rated public parks — playgrounds, gardens, and river trails minutes away.",
          image: "/images/explore/gathering-place.jpg",
          linkLabel: "Experience Tulsa",
          href: "https://www.tulsago.com/local",
        },
        {
          title: "Guthrie Green",
          category: "Events Around Town",
          description:
            "Free concerts, festivals, and a weekly farmers market in the heart of the Tulsa Arts District.",
          image: "/images/explore/guthrie-green.jpg",
          linkLabel: "Upcoming Events",
          href: "https://www.tulsago.com/experience",
        },
        {
          title: "Local Coffee & Food",
          category: "Food & Drink",
          description:
            "Walkable cafes and restaurants around Kendall-Whittier and downtown Tulsa.",
          image: "/images/explore/local-coffee.jpg",
          linkLabel: "Local Food",
          href: "https://www.tulsago.com/eat",
        },
      ],
    },
  },
  {
    key: "getting-around",
    pageSlug: "explore",
    name: "Getting Around",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "paragraph", label: "Paragraph", kind: "textarea" },
      {
        key: "items",
        label: "Facts",
        kind: "cardList",
        itemLabel: "Fact",
        itemFields: [
          { key: "value", label: "Value (e.g. 10 min)", kind: "text" },
          { key: "label", label: "Label", kind: "text" },
        ],
      },
    ],
    defaultContent: {
      eyebrow: "Getting Around",
      heading: "Right in the Middle of It All",
      paragraph:
        "Downtown Tulsa, Cherry Street, and the Arts District are all a short drive away — some close enough to walk.",
      items: [
        { value: "10 min", label: "Walk to the Stadium" },
        { value: "5 min", label: "To Expo Center & BOK Center" },
        { value: "8 mi", label: "To Tulsa Airport" },
        { value: "Free", label: "Street Parking Out Front" },
      ],
    },
  },

  // ---- contact ----
  {
    key: "contact-banner",
    pageSlug: "contact",
    name: "Page Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "title", label: "Title", kind: "text" },
      { key: "image", label: "Banner image", kind: "image" },
      { key: "imageAlt", label: "Image alt text", kind: "text" },
    ],
    defaultContent: {
      eyebrow: "Let's Talk",
      title: "Contact Us",
      image: "/images/properties/oasis-2/1.jpg",
      imageAlt: "Open-concept kitchen and living area at Xscapecation Oasis",
    },
  },
  {
    key: "contact-intro",
    pageSlug: "contact",
    name: "Contact Form Heading",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "buttonText", label: "Submit button text", kind: "text" },
    ],
    defaultContent: {
      eyebrow: "Send a Message",
      heading: "Book Your Stay",
      buttonText: "Send Message",
    },
  },

  // ---- book ----
  {
    key: "book-banner",
    pageSlug: "book",
    name: "Page Banner",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", kind: "text" },
      { key: "title", label: "Title", kind: "text" },
      { key: "image", label: "Banner image", kind: "image" },
      { key: "imageAlt", label: "Image alt text", kind: "text" },
    ],
    defaultContent: {
      eyebrow: "Direct Reservation",
      title: "Reserve Your Stay",
      image: "/images/properties/oasis-2/3.jpg",
      imageAlt: "Bright open-concept living area at Xscapecation Oasis",
    },
  },
  {
    key: "book-intro",
    pageSlug: "book",
    name: "Intro & Trust Badges",
    fields: [
      { key: "paragraph", label: "Intro paragraph", kind: "textarea" },
      {
        key: "items",
        label: "Trust badges",
        kind: "cardList",
        itemLabel: "Badge",
        itemFields: [{ key: "label", label: "Label", kind: "text" }],
      },
    ],
    defaultContent: {
      paragraph:
        "Book directly with us and enjoy the best rate, no third-party fees, and a real host on the other end.",
      items: [
        { label: "$0 Service Fees" },
        { label: "Best Rate Guaranteed" },
        { label: "Direct Host Access" },
      ],
    },
  },
];

export function getSectionDef(pageSlug: string, key: string): SectionDef | undefined {
  return SECTION_REGISTRY.find((s) => s.pageSlug === pageSlug && s.key === key);
}

export function getSectionDefsForPage(pageSlug: string): SectionDef[] {
  return SECTION_REGISTRY.filter((s) => s.pageSlug === pageSlug);
}
