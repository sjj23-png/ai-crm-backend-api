# PROJECT 5: AI-Powered Content & Marketing Generator Dashboard
## Requirements & System Design Document (for AI Agent Implementation)

> **Instructions for the coding agent**: Build this application exactly as specified below. Every service listed is on a **free tier** unless explicitly marked `[PAID]`. Where a paid service is mentioned, use the marked **FREE ALTERNATIVE** instead unless the user says otherwise. Implement features in the priority order given (P0 → P2). Do not add paid SDKs, paid APIs, or services requiring a credit card without flagging it first.

---

## 1. PRODUCT OVERVIEW

An all-in-one AI content workspace: generate social posts, blog drafts, and email campaigns from a single input, organize them on a visual content calendar, and track basic performance stats. Positioned like a lightweight Jasper/Buffer hybrid. This is the most visually "wow" of the five projects for a client demo — AI generation + calendar + charts in one polished flow — so it's worth giving the frontend extra care.

**Primary users:**
1. **Marketer/Admin** — generates content, manages calendar, invites team
2. **Team Member** *(P1)* — drafts/edits content, admin approves before scheduling

---

## 2. FUNCTIONAL REQUIREMENTS

### Module A: AI Content Generator (P0 — core feature)
- Single input screen: topic/prompt + content type selector (`Social Post`, `Blog Draft`, `Email Campaign`) + tone selector (`Professional`, `Casual`, `Witty`, `Persuasive`) + platform selector for social (`Instagram`, `LinkedIn`, `Twitter/X`, `Facebook`) — platform choice adjusts length/style of generated output
- AI generates 3 variations per request (not just one) so the user has real choice — a strong differentiator over single-output tools
- Each variation shown in a platform-accurate preview card (e.g., Instagram caption preview looks like an Instagram post, LinkedIn preview looks like a LinkedIn post)
- User can regenerate, edit inline, or save a variation as a Draft
- For blog drafts: generate a structured draft (title + headings + body sections), not just a single blob of text
- For email campaigns: generate subject line options (3) + body

### Module B: Content Library (P0)
- All saved drafts/generated content in one searchable/filterable library
- Filter by type (Social/Blog/Email), platform, status (`Draft`, `Scheduled`, `Published`), tag
- Each item has: content body, associated image (see Module D), status, scheduled date

### Module C: Content Calendar (P0)
- Month/week calendar view showing scheduled content as colored blocks (colored by content type)
- Drag content from Library onto a calendar date to schedule it
- Drag existing calendar items to reschedule
- Click a calendar item → quick-edit panel

### Module D: AI Image Suggestion (P1)
- For social posts, offer a free stock-photo search (via a free image API) matched to the post topic, so the user has a visual to pair with the caption without needing a paid image-generation API
- User can also upload their own image

### Module E: Performance Stats (P1)
- Since real social-platform analytics APIs require paid developer access/OAuth review for most platforms, MVP performance tracking is **manual entry**: after publishing (outside the app, on the actual platform), user logs back in and enters basic stats (likes, comments, shares, opens/clicks for email) against that content item
- Dashboard: engagement over time chart, best-performing content type, best-performing platform, best time-of-day pattern (derived from the manually logged stats)
- This is clearly labeled in the UI as "Log your results" rather than pretending to be a live auto-pulled integration — important for demo honesty and to set correct client expectations

### Module F: Brand Voice Profile (P1 — nice differentiator)
- Admin fills a one-time "Brand Voice" form: business description, target audience, tone preferences, 2-3 example posts they like
- This profile is automatically included in every AI generation prompt, so outputs feel consistent and on-brand without the user re-typing context every time

---

## 3. NON-FUNCTIONAL REQUIREMENTS

- Free to run at small-team content-marketing scale (dozens of generations per day, a content calendar with hundreds of items)
- AI generation should feel fast — show streaming or a well-designed loading state, since 3-variation generation may take a few seconds
- Multi-tenant: each brand/workspace's content and brand-voice profile is isolated
- Calendar drag-drop should not require a page reload

---

## 4. TECH STACK (ALL FREE TIER)

| Layer | Choice | Free Tier Details | Comment |
|---|---|---|---|
| Frontend framework | **Next.js** | Free | Consistent with prior projects |
| Styling/UI | **Tailwind CSS + shadcn/ui** | Free | — |
| Calendar UI | **react-big-calendar** or **FullCalendar (open-source/MIT core)** with drag-drop | Free, open source | — |
| Charts | **Recharts** | Free | Performance stats dashboard |
| Drag & drop (library → calendar) | **dnd-kit** | Free | Same library as Project 2, reusable pattern |
| Backend/API | **Next.js API routes** | Free | — |
| Database + Auth + Storage | **Supabase** (free tier) | **FREE** | Same pattern as prior projects |
| AI text generation | **Google Gemini API (free tier)** | **FREE** | `// [PAID ALTERNATIVE]: OpenAI GPT-4o — only if client wants it and is paying for usage` |
| Stock image search | **Unsplash API (free tier: 50 requests/hour on demo key)** | **FREE** | `// [PAID ALTERNATIVE]: AI image generation (DALL·E, Midjourney API) — genuinely paid with no free tier; do NOT build this into MVP, offer Unsplash search instead` |
| Hosting | **Vercel (free Hobby tier)** | **FREE** | — |

**Result: $0/month.** The one thing to be explicit about with clients: true AI *image* generation (not stock search) is a paid-API feature industry-wide — there is no meaningfully free alternative for that specific capability, so it's correctly excluded from the free-tier MVP and flagged as a future paid upsell.

---

## 5. SYSTEM ARCHITECTURE

```
┌───────────────────┐        ┌──────────────────────────┐        ┌─────────────────┐
│  Generator UI        │──────▶│   Next.js App (Vercel)     │◀──────▶│    Supabase      │
│  Library / Calendar   │       │  - UI (React, dnd-kit)      │       │  - Postgres DB   │
│  Performance stats    │       │  - API routes               │        │  - Auth          │
└───────────────────┘        └──────────────┬──────────────┘        │  - Storage        │
                                             │                       └─────────────────┘
                              ┌──────────────┴──────────────┐
                              ▼                              ▼
                ┌──────────────────────────┐   ┌──────────────────────────┐
                │  Google Gemini API (free)  │   │  Unsplash API (free)       │
                │  - Text generation          │   │  - Stock image search      │
                │  - Brand-voice-aware prompts│   └──────────────────────────┘
                └──────────────────────────┘
```

**Flow (generation)**: User submits prompt + type + platform + tone → API route fetches the workspace's saved Brand Voice profile → constructs a combined prompt → calls Gemini once, requesting 3 structured variations (JSON response) → returns to frontend → user picks/edits/saves one or more as Drafts in `content_items`.

**Flow (scheduling)**: User drags a library card onto a calendar date → API route updates `content_items.scheduled_date` and `status = 'scheduled'` → Supabase Realtime reflects the change if multiple team members have the calendar open.

---

## 6. DATA MODELS (Supabase / Postgres schema)

```sql
workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
)

workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id),
  auth_user_id uuid references auth.users(id),
  full_name text,
  role text check (role in ('admin','member')) default 'member'
)

brand_voice_profiles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id),
  business_description text,
  target_audience text,
  tone_preferences text,
  example_posts text[],           -- array of example post texts the brand likes
  updated_at timestamptz default now()
)

content_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id),
  type text check (type in ('social','blog','email')),
  platform text,                  -- 'instagram','linkedin','twitter','facebook', null for blog/email
  title text,                     -- used for blog/email
  body text not null,
  image_url text,
  status text check (status in ('draft','scheduled','published')) default 'draft',
  scheduled_date date,
  created_by uuid references workspace_members(id),
  created_at timestamptz default now()
)

content_tags (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id),
  name text
)

content_item_tags (
  content_item_id uuid references content_items(id),
  tag_id uuid references content_tags(id),
  primary key (content_item_id, tag_id)
)

performance_logs (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid references content_items(id),
  likes int default 0,
  comments int default 0,
  shares int default 0,
  opens int default 0,            -- for email
  clicks int default 0,           -- for email
  logged_at timestamptz default now()
)
```

**Row-Level Security**: enable RLS; scope by `workspace_id` matching the authenticated member's workspace.

---

## 7. API ENDPOINTS

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/ai/generate` | Generate 3 content variations (body: type, platform, tone, prompt) |
| POST | `/api/content-items` | Save a generated/edited variation as a draft |
| GET | `/api/content-items` | List/filter content library |
| PATCH | `/api/content-items/:id` | Edit content, update status, schedule (set date) |
| DELETE | `/api/content-items/:id` | Delete a draft |
| GET | `/api/calendar?month=` | Get scheduled items for calendar view |
| GET | `/api/images/search?q=` | Unsplash stock image search proxy |
| POST | `/api/performance-logs` | Log manual performance stats for a published item |
| GET | `/api/analytics/performance` | Aggregated performance dashboard data |
| GET/PUT | `/api/brand-voice` | Get/update the workspace's brand voice profile |

---

## 8. FOLDER STRUCTURE (Next.js App Router)

```
/app
  /(app)
    /generate/page.tsx           -- main AI generator screen
    /library/page.tsx
    /calendar/page.tsx
    /performance/page.tsx
    /brand-voice/page.tsx
    /settings/page.tsx
  /api
    /ai/generate/route.ts
    /content-items/route.ts
    /content-items/[id]/route.ts
    /calendar/route.ts
    /images/search/route.ts
    /performance-logs/route.ts
    /analytics/performance/route.ts
    /brand-voice/route.ts
/components
  /ui/
  GeneratorForm.tsx
  VariationCard.tsx             -- platform-accurate preview card
  ContentLibraryTable.tsx
  ContentCalendar.tsx
  ImageSearchModal.tsx
  PerformanceChart.tsx
  BrandVoiceForm.tsx
/lib
  supabaseClient.ts
  geminiClient.ts
  unsplashClient.ts
/types
  contentItem.ts
```

---

## 9. FRONTEND DESIGN SPEC

### 9.1 Design Tokens

**Color palette** — creative/energetic but still professional (this tool should feel inspiring to use, distinct from the more utilitarian feel of Projects 1–4)
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#7C3AED` (violet) | Buttons, active states, AI-related accents |
| `primary-hover` | `#6D28D9` | Hover |
| `accent-gradient` | `linear-gradient(135deg, #7C3AED, #EC4899)` | Used sparingly: the "Generate" button and generator-page header only — this is the one place a gradient is appropriate across all 5 projects, since this tool is explicitly creative/marketing-flavored |
| `bg-canvas` | `#FAFAFA` | Page background |
| `bg-surface` | `#FFFFFF` | Cards |
| `border` | `#E5E7EB` | Dividers |
| `text-primary` | `#18181B` | Headings/body |
| `text-secondary` | `#71717A` | Meta text |
| Content-type colors | `Social #7C3AED` (violet) · `Blog #2563EB` (blue) · `Email #DB2777` (pink) | Used consistently on calendar blocks, library tags, and stat charts |
| `success` | `#16A34A` | Published status |

**Typography**
- Font: `Inter` for UI chrome; generated content preview cards use platform-accurate fonts where reasonable (e.g., a system sans for Instagram-style preview, a serif option toggle for blog title preview) — small touch that makes previews feel authentic
- Scale: consistent with prior projects

**Spacing & shape**
- `rounded-xl` (12px) cards — this app should feel a bit more playful/rounded than Project 2's sharp tool aesthetic, closer to Project 3's friendliness but with the added `accent-gradient` moments
- Shadows: `shadow-sm` default, `shadow-lg` on the variation cards when a user hovers to indicate they're selectable

**Icons**: `lucide-react`, plus a small sparkle (✨) motif reused consistently anywhere AI is acting (generate button, AI-suggested tags, etc.) — the same visual language used in Projects 1 & 2's AI features, for consistency if you present all 5 projects together as a portfolio

### 9.2 Layout — Generator Page (`/generate`) — the demo's centerpiece

- Top: prompt input area — large textarea with placeholder ("What do you want to create content about?"), below it a row of pill-style selectors: Content Type (Social/Blog/Email) → Platform (only shown if Social selected) → Tone. `Generate` button uses `accent-gradient` background, full-width or prominent on the right, with the sparkle icon
- Loading state: 3 skeleton preview cards appear immediately (before content streams in) so the layout doesn't jump — shimmer animation for 2-4 seconds
- Results: 3 `VariationCard` components side-by-side (stack on mobile) — each styled to mimic the actual platform:
  - Instagram preview: square image area + caption below, mimics a real IG post card
  - LinkedIn preview: profile-bar mockup (generic avatar + business name) + post text
  - Blog preview: title in large serif-optional font + heading outline + first paragraph, "Read full draft" expands the rest
  - Email preview: subject line in a mock inbox-row style + expandable body
- Each card footer: `Save as Draft` / `Edit` / `Regenerate this one` buttons

### 9.3 Layout — Content Library (`/library`)

- Filter bar: Type, Platform, Status, Tag dropdowns + search
- Grid of content cards (not a plain table — visual grid fits this content-heavy tool better), each showing a content-type-colored top border, truncated preview text, status badge, scheduled date if set
- Click card → same detail/edit panel used in the generator's save flow

### 9.4 Layout — Content Calendar (`/calendar`)

- Month view default, react-big-calendar or FullCalendar styled to tokens above
- Each day cell shows small colored dots/blocks per scheduled item (colored by content-type token), overflow shows "+2 more"
- Drag a card from a collapsible side panel (shows unscheduled Library drafts) onto a calendar date to schedule — side panel + calendar side-by-side on desktop, calendar-only with a "Schedule" button flow on mobile (drag-drop is desktop-optimized, mobile gets a date-picker fallback)

### 9.5 Layout — Performance Dashboard (`/performance`)

- Clear labeling at top: "Manually logged results — connect your platforms' native analytics for full accuracy" (honest framing, avoids overpromising a live integration that doesn't exist)
- Stat cards: Total Engagement, Best Content Type, Best Platform, Best Posting Time
- Line chart: engagement over time
- Bar chart: engagement by content type
- "Log Results" quick-entry button on any published content-library item opens a small form (likes/comments/shares or opens/clicks depending on type)

### 9.6 Component States Checklist

- **Variation cards**: loading (skeleton) / loaded / selected(saved, shows checkmark) / hover (shadow-lg lift)
- **Calendar day cells**: default / today (border highlight) / drag-over (dashed `primary` border) / has-items
- **Generate button**: default (gradient) / hover (slightly darker gradient) / loading (spinner + "Generating…" label, disabled) 

### 9.7 Responsive Breakpoints

- Generator page: 3-column variation cards ≥1280px → 2-column ≥768px → 1-column stacked below that (this is the most content-heavy screen, give it the most breakpoint granularity)
- Calendar: full month grid ≥1024px, switch to a vertical agenda-list view below that (a full month grid is unusable on mobile — don't try to force it)

---

## 10. FREE-TIER DEPLOYMENT PLAN

1. Create free Supabase project → run schema → enable RLS
2. Get free Gemini API key
3. Get free Unsplash API demo key (50 req/hour — plenty for a demo)
4. Push to GitHub → connect to Vercel free tier → set env vars
5. Deploy → fill in a sample Brand Voice profile and generate a realistic batch of content across all 3 types so the Library and Calendar aren't empty for the demo → manually log a few performance stats so that chart isn't empty either
6. Record the demo starting with the Generator page (strongest visual moment: gradient button → skeleton loading → 3 platform-accurate variation cards appearing) — lead every pitch with this specific screen

---

## 11. FUTURE PAID UPGRADE PATH (reference only)

- AI image generation (DALL·E/Midjourney/Stable Diffusion API) `[PAID]` — clearly the highest-value upsell for this product, no free equivalent exists
- Direct social platform publishing (posting directly via Meta/LinkedIn/X APIs) — technically free API access exists but requires app review/approval processes per platform, non-trivial to set up; positioned as a "coming soon" / paid-tier integration
- OpenAI GPT-4o for generation quality upgrade
- Supabase Pro once a client's content volume/team size grows

---

*End of Project 5 spec. Ready to hand to the Antigravity agent.*

---

## PORTFOLIO NOTE (all 5 projects)

All five specs share the same underlying stack pattern (Next.js + Supabase + Vercel + Gemini free tier), which means:
- You can reuse auth, multi-tenant, and deployment patterns across all 5 — build the first one carefully, the rest go faster
- All 5 run at **$0/month** cost, so you can keep every demo live indefinitely for client calls without worrying about hosting bills
- Each project's AI feature uses the same "✨ sparkle" visual language, so if you present all 5 together as a portfolio, they read as a cohesive body of work rather than 5 unrelated experiments
- When you land a real client, the natural upsell conversation is already written into each file's Section "Future Paid Upgrade Path" — you can literally walk a client through free-vs-paid tradeoffs using these notes
