export const image = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const fleet = [
  {
    slug: "first-class-sedan",
    name: "First Class",
    model: "Mercedes-Benz S-Class",
    passengers: 2,
    image: image("photo-1563720223185-11003d516935"),
    description: "A private sanctuary for the most considered journeys.",
    features: ["Heated massage seating", "Whisper-quiet cabin", "Bottled water"],
  },
  {
    slug: "full-size-suv",
    name: "Full Size SUV",
    model: "Cadillac Escalade",
    passengers: 6,
    image: image("photo-1519641471654-76ce0107ad1b"),
    description: "Room to settle in, with confidence to spare.",
    features: ["Three-row comfort", "Ample luggage space", "All-weather capability"],
  },
  {
    slug: "sprinter-van",
    name: "Sprinter Van",
    model: "Mercedes-Benz Sprinter",
    passengers: 12,
    image: image("photo-1544620347-c4fd4a3d5957"),
    description: "A beautifully composed ride for your whole party.",
    features: ["Spacious cabin", "Group-friendly seating", "Dedicated chauffeur"],
  },
  {
    slug: "executive-sedan",
    name: "Executive Sedan",
    model: "Mercedes-Benz E-Class",
    passengers: 2,
    image: image("photo-1503376780353-7e6692767b70"),
    description: "Effortless, understated comfort for every day.",
    features: ["Leather interior", "Climate control", "Complimentary Wi-Fi"],
  },
];

export const services = [
  ["airport-transfers", "Airport Transfers", "A seamless welcome at O’Hare, Midway, or Chicago Executive.", "photo-1436491865332-7a61a109cc05"],
  ["corporate-travel", "Corporate Travel", "Thoughtful, discreet transportation for work that matters.", "photo-1497366754035-f200968a6e72"],
  ["black-car-service", "Black Car Service", "Your own private car and professional chauffeur, on your time.", "photo-1449965408869-eaa3f722e40d"],
  ["hourly-chauffeur", "Hourly Chauffeur", "A dedicated driver, ready whenever the day takes you.", "photo-1511895426328-dc8714191300"],
  ["chicago-limo-service", "Chicago Limo Service", "Make an entrance with considered luxury from door to door.", "photo-1519608487953-e999c86e7455"],
  ["cruise-port-transfers", "Cruise Port Transfers", "A relaxed start and finish to your journey on the water.", "photo-1494783367193-149034c05e8f"],
  ["special-occasions", "Special Occasions", "Arrive beautifully for the moments worth remembering.", "photo-1511795409834-ef04bbd61622"],
  ["wedding-transportation", "Wedding Transportation", "A calm, elegant ride for your once-in-a-lifetime day.", "photo-1519741497674-611481863552"],
].map(([slug, title, description, photo]) => ({ slug: slug as string, title: title as string, description: description as string, image: image(photo as string) }));

export const airports = [
  { code: "ORD", name: "O’Hare International Airport", text: "A considered arrival, from baggage claim to your final destination. We coordinate your pickup around your flight and provide clear meeting instructions.", image: image("photo-1436491865332-7a61a109cc05") },
  { code: "MDW", name: "Midway International Airport", text: "Skip the uncertainty after landing. Your chauffeur keeps an eye on your arrival and makes the last leg of your trip feel effortless.", image: image("photo-1517760444937-f6397edcbbcd") },
  { code: "PWK", name: "Chicago Executive Airport", text: "Discreet, dependable transfers for private aviation and business travel throughout Chicago’s North Shore.", image: image("photo-1474302770737-173ee21bab63") },
];

export const areas = {
  "Chicago Neighborhoods": ["Downtown Chicago", "Central Business District", "River North", "Gold Coast", "Magnificent Mile", "Lincoln Park", "West Loop", "Hyde Park", "Streeterville", "Wicker Park"],
  "Suburbs & Beyond": ["Evanston", "Naperville", "Oak Brook", "Schaumburg", "Rosemont", "Skokie", "Oak Park", "Arlington Heights"],
  "Event Destinations": ["United Center", "Soldier Field", "McCormick Place", "Navy Pier", "Wrigley Field", "Wintrust Arena"],
};

export const events = [
  ["Corporate Events", "Arrive composed. Leave the logistics to us.", "photo-1497366754035-f200968a6e72"],
  ["Weddings", "Elegant transport, thoughtfully planned around your day.", "photo-1519741497674-611481863552"],
  ["Concerts & Sports", "A better way to get there, and a better way home.", "photo-1459749411175-04bf5292ceea"],
  ["Private Parties", "Keep your people together and the evening effortless.", "photo-1511795409834-ef04bbd61622"],
  ["Business Conferences", "Dependable group and executive transportation.", "photo-1505373877841-8d25f7d46678"],
  ["Special Occasions", "The ride should feel as memorable as the moment.", "photo-1511988617509-a57c8a288659"],
].map(([title, description, photo]) => ({ title, description, image: image(photo as string) }));

export const articles = [
  {
    slug: "a-better-way-to-arrive-at-ohare",
    title: "A Better Way to Arrive at O’Hare",
    category: "Airport Travel",
    date: "October 12, 2026",
    image: image("photo-1436491865332-7a61a109cc05"),
    excerpt: "A few thoughtful details can transform the first and last miles of your journey.",
    content: ["Travel is demanding enough without adding uncertainty to the journey between the airport and your door. A pre-arranged chauffeur gives you one less decision to make when you land.", "Share your flight details when you book. Your chauffeur can plan around your arrival, while clear pickup instructions make the handoff simple—even after a long flight.", "Whether you’re heading downtown or home to the suburbs, a little planning makes the last mile feel like part of the trip, not an afterthought."],
  },
  {
    slug: "the-case-for-a-chauffeur-on-business",
    title: "The Case for a Chauffeur on Business",
    category: "City Notes",
    date: "September 26, 2026",
    image: image("photo-1497366754035-f200968a6e72"),
    excerpt: "Make the space between meetings work a little harder for you.",
    content: ["A well-planned business day is about more than the meetings themselves. A quiet, comfortable ride gives you room to prepare, take a call, or simply reset between appointments.", "A dedicated chauffeur brings consistency to a busy itinerary, especially when your day spans multiple neighborhoods or includes a group of colleagues.", "The right transportation should feel almost invisible: punctual, discreet, and considered from pickup to drop-off."],
  },
  {
    slug: "choosing-the-right-vehicle-for-your-group",
    title: "Choosing the Right Vehicle for Your Group",
    category: "The Fleet",
    date: "September 08, 2026",
    image: image("photo-1519641471654-76ce0107ad1b"),
    excerpt: "A practical guide to matching the ride to the occasion.",
    content: ["The best vehicle for your trip depends on more than passenger count. Luggage, the length of the journey, and the kind of occasion all deserve a moment’s thought.", "For one or two travelers, an executive sedan offers a calm, comfortable setting. A full-size SUV makes room for a small group and their bags, while a Sprinter keeps a larger party together.", "Not sure what fits? Tell us about your trip when you request a booking and our team will be glad to help you choose."],
  },
];
