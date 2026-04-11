export const SAMPLE_JD_STRIPE_FULLSTACK = `Stripe — Software Engineer, Full Stack
Location: Remote in Canada
Team: Growth Engineering

About the team
Stripe's Growth Engineering team builds the tools and surfaces that help millions of businesses discover, evaluate, and adopt Stripe. We ship experiments weekly across stripe.com, Dashboard, and internal tooling used by sales and partnerships. We care deeply about velocity, craft, and measurable user impact.

What you'll do
- Design, build, and ship full-stack features across stripe.com marketing surfaces, Dashboard, and internal revenue-operations tools.
- Own features end-to-end: API design, data modeling, backend services, React/TypeScript frontends, experimentation, and rollout.
- Collaborate with PMs, designers, data scientists, and marketers to translate ambiguous business goals into shipped product.
- Instrument features with analytics and run controlled experiments to measure impact on signup, activation, and revenue.
- Contribute to platform libraries and internal tooling that unblock other engineering teams.
- Review code, mentor newer engineers, and raise the engineering bar across the team.

Minimum requirements
- 4+ years of professional software engineering experience shipping user-facing products.
- Strong proficiency in TypeScript and a modern React framework (Next.js preferred).
- Experience designing and operating production APIs and data models (SQL, relational reasoning).
- Comfort owning features from spec to production: instrumentation, rollout, on-call, iteration.
- Track record of collaborating with non-engineers (PMs, designers, marketers, data).

Preferred
- Experience with experimentation platforms and A/B testing at scale.
- Exposure to growth problems: signup conversion, activation, pricing pages, SEO.
- Familiarity with edge/serverless platforms (Vercel, Cloudflare Workers, Fluid Compute).
- Contributions to open source or technical writing that demonstrate craft.
- Fluency in a second language (French, Spanish, Japanese, or German) is a plus.

Compensation
This role is available in Canada. Annual base salary range: CAD 145,000 – 210,000, plus equity and benefits. Final offer depends on experience, location, and qualifications.`;

export const SAMPLE_RESUME_ARSHIA = `# CV -- Arshia Hamidi

**Title:** Software Engineer
**Location:** Montreal, Canada
**Email:** Arshiahamidi88@yahoo.com
**Phone:** 514-638-1001
**LinkedIn:** linkedin.com/in/arshiahamidi
**GitHub:** github.com/ashthedaddy

## Professional Summary

Full-stack Software Engineer with 2+ years building production systems in Next.js, React, TypeScript, Python, and Supabase. Built an AI-powered lead acquisition pipeline processing 1000+ leads (Facebook Ads, n8n, Twilio SMS, GPT-4o), a luxury real estate site (Next.js 16, Sanity CMS, GSAP), a real-time lead dashboard, and a bilingual AI voice receptionist for dental clinics (FastAPI, Vapi, 26 DB migrations, 11 API routes). Bilingual French/English, based in Montreal.

## Work Experience

### Vroom Quebec -- Montreal, QC
**Software Developer**
Jan. 2024 - Present

- Architected the full lead pipeline: Facebook Lead Ads -> n8n workflows -> Supabase -> Twilio SMS -> GPT-4o conversation agent -> calendar booking. Processed 1000+ leads.
- Built 3 n8n workflows: WF1 (lead intake + dedup + first SMS), WF2 (AI SMS conversation agent with VIN decoding, language detection, appointment booking), WF3 (Airtable <-> Supabase sync every 30 min)
- Built a real-time lead monitoring dashboard in Next.js 16, React 19, TypeScript, and Supabase with live WebSocket updates, status filtering, SMS composer, and analytics (funnel charts, 14-day trends)
- Deployed dashboard to Vercel with Supabase auth, Row-Level Security, and Twilio SMS API integration
- Built the public-facing WordPress site with a custom Vite-powered theme: AJAX vehicle inventory filtering, VIN decoder, bulk CSV import, 11 custom taxonomies, GA4 + Meta Pixel tracking

### Equipe Mazzeo (RE/MAX du Cartier) -- Montreal, QC
**Software Developer**
Sep. 2025 - Present

- Built a 48-page premium real estate site for a RE/MAX Montreal broker using Next.js 16, React 19, TypeScript, Sanity CMS, Framer Motion, and GSAP. Deployed on Vercel with auto-deploy from GitHub.
- Delivered full site architecture: 8 SEO neighborhood pages, 8 service pages, 6 Google Ads landing pages, blog system, mortgage calculator, welcome tax calculator, and 4 conversion funnels
- Integrated 21 real Centris property listings with CDN-hosted photos and dynamic routing
- Set up GA4, Google Tag Manager, conversion tracking, Search Console with sitemap submission for 42 indexable pages
- Configured Google Ads conversion tracking, remarketing audiences, and Local Services Ads application
- Built Looker Studio reporting dashboard for automated weekly performance data
- Implemented JSON-LD structured data across all pages
- Ran Core Web Vitals audit and improved Lighthouse score from 60 to 79

### OWL.CO -- Vancouver, BC
**Software Engineer Intern**
Apr. 2023 - Dec. 2023

- Built 3 production features from design to deploy using React, TypeScript, and Next.js with server-side rendering
- Migrated the entire UI component library from REAKIT to ANTD, unblocking 2 new product launches
- Set up testing infrastructure: unit tests (Jest), integration tests (Cypress), and E2E tests (Selenium)
- Coordinated across frontend and backend teams during sprint cycles

## Software Projects

### AI Voice Receptionist (2026)
- Built a bilingual (French/English) AI phone receptionist for dental clinics: 24/7 call answering, booking, triage
- Backend: FastAPI, 26 Supabase migrations with RLS, 11 API routers (43 routes), Fernet encryption for OAuth tokens
- Voice: Vapi + Claude Sonnet 4 + Deepgram, 11 tool integrations
- Frontend: Next.js dashboard, 15 pages, deployed on Vercel
- Wrote 12 E2E tests. Deployed backend to Railway, dashboard to Vercel, wrote HIPAA compliance docs

### CareerLens (2026)
- Built this bilingual (EN/FR) AI ATS analyzer and cover letter generator in 3 evenings
- Next.js 16, React 19, TypeScript, Tailwind 4, AI SDK v6, Claude Sonnet 4.6, Zod
- Stateless, streaming structured output, XML-tag input isolation, in-memory rate limit
- Live: careerlens.vercel.app

## Education

### Concordia University -- Montreal, QC
**Bachelor's in Software Engineering** — Jan. 2019 - Apr. 2023

## Technical Skills

- **Languages:** JavaScript, TypeScript, Python, PHP, Java, C, C++, HTML/CSS
- **Frontend:** React, Next.js 16, Vue, Framer Motion, GSAP, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, FastAPI, REST APIs, Strapi, WordPress
- **Databases:** PostgreSQL, Supabase (Auth, Realtime, RLS), MySQL, MongoDB
- **AI/ML:** Claude API, OpenAI GPT-4o, Vapi, Deepgram, PyTorch, n8n workflow automation
- **Cloud & DevOps:** Vercel, Railway, AWS, Twilio, Git, CI/CD, Docker
- **Testing:** Jest, Cypress, Selenium, pytest, Vitest
- **CMS:** Sanity, WordPress
- **Languages (human):** English (fluent), French (fluent, Québec)
`;
