# Maison Motor Chicago

A responsive Next.js application for a Chicago chauffeur and luxury transportation service. Public pages use server rendering and shared content; booking requests and the admin booking dashboard use PostgreSQL through Prisma.

## Local setup

1. Install Node.js 20.9 or newer and PostgreSQL.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and a random `ADMIN_SESSION_SECRET` of at least 32 characters.
3. Generate a bcrypt password hash with `node -e "require('bcryptjs').hash('your-password', 12).then(console.log)"` and assign it to `ADMIN_PASSWORD_HASH`.
4. Install dependencies and initialize the schema:

   ```powershell
   npm install
   npm run db:push
   ```

5. Start the development server with `npm run dev`. Open `/admin/login` to access the booking dashboard.

The public booking form creates a **request**, not a confirmed reservation. A database connection is required to save requests. Payments, live fleet availability, dispatch, and booking confirmation are not implemented. Brand, fleet, and service copy are starter content; confirm real operating details and add verified luggage capacities and contact information before launch.

## Routes

- `/`, `/services`, `/airports`, `/areas`, `/fleet`, `/fleet/[slug]`
- `/about`, `/events`, `/journal`, `/journal/[slug]`, `/book`
- `/admin/login`, `/admin`
- `/api/bookings`, `/api/admin/login`, `/api/admin/logout`, `/api/admin/bookings`
- `/robots.txt`, `/sitemap.xml`

The Prisma schema includes models for bookings, vehicles, services, airports, service areas, blog categories and posts, events, customer inquiries, and admin users. Public editorial and catalog content is currently maintained in `lib/content.ts`; the admin dashboard currently manages booking requests and their statuses.
