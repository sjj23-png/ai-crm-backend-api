# PROJECT 4: E-commerce Analytics & Inventory Dashboard
## Requirements & System Design Document (for AI Agent Implementation)

> **Instructions for the coding agent**: Build this application exactly as specified below. Every service listed is on a **free tier** unless explicitly marked `[PAID]`. Where a paid service is mentioned, use the marked **FREE ALTERNATIVE** instead unless the user says otherwise. Implement features in the priority order given (P0 → P2). Do not add paid SDKs, paid APIs, or services requiring a credit card without flagging it first.

---

## 1. PRODUCT OVERVIEW

A unified analytics + inventory dashboard for small-to-mid online sellers who sell across multiple channels (their own Shopify/website, Amazon, Instagram/WhatsApp orders, offline). Solves the real pain of "my sales data is scattered across 3 places and I don't know what's low on stock." Data enters via CSV import or manual entry for the demo/free build; a Shopify API connector is included since **Shopify's Admin API itself is free to use** (only the Shopify store subscription costs money, and a free Shopify Partner "development store" is sufficient to build and demo against).

**Primary users:**
1. **Store Owner/Admin** — full access, views analytics, manages inventory
2. **Staff** *(P2)* — limited access (view orders, update stock, no financial data)

---

## 2. FUNCTIONAL REQUIREMENTS

### Module A: Product & Inventory Management (P0)
- Product catalog: name, SKU, category, cost price, sell price, current stock quantity, image
- Manual stock adjustment (restock, correction) with a logged reason
- Low-stock threshold per product; products below threshold flagged on dashboard
- Bulk import products via CSV upload

### Module B: Order Ingestion (P0)
- **Manual entry**: add an order with line items, channel tag, customer info, date
- **CSV import**: upload orders in bulk (common export format from Shopify/Amazon/Excel)
- **Shopify API sync** (P1): connect a Shopify store (via Admin API access token — free to generate on any Shopify store including free dev stores) to auto-pull orders and products
- Every order is tagged with a `channel`: `Shopify`, `Amazon`, `Instagram/WhatsApp`, `Offline`, `Other` (admin-editable list)
- Order status: `Paid`, `Fulfilled`, `Cancelled`, `Refunded`

### Module C: Sales Analytics Dashboard (P0)
- Revenue over time (line chart, daily/weekly/monthly toggle)
- Revenue by channel (stacked bar or pie chart) — the "multi-channel overview" headline feature
- Top-selling products (ranked list/bar chart by units sold and by revenue — two toggleable views)
- Average order value trend
- Orders by status breakdown

### Module D: Inventory Alerts (P0)
- Dashboard widget: list of products currently below low-stock threshold, sorted by urgency (days-of-stock-remaining estimate based on recent sales velocity)
- In-app notification badge when a product crosses into low-stock

### Module E: Profit Insights (P1)
- Since products have both cost price and sell price, compute gross profit per order and per product
- Profit margin trend chart, most-profitable vs. highest-revenue products comparison (these two lists often differ — a genuinely useful insight)

### Module F: Reports Export (P1)
- Export current dashboard view (date range) as CSV — sellers often need this for their own accountant/tax filing

---

## 3. NON-FUNCTIONAL REQUIREMENTS

- Free to run for a small seller (thousands of orders/month is still well within Supabase free tier limits)
- CSV import must handle reasonably messy real-world exports (flexible column-name matching, not exact-header-only)
- Dashboard should load fast even with a full year of order history — use aggregation queries, not client-side computation over raw rows
- Multi-tenant: one Supabase project can serve multiple demo stores, each isolated

---

## 4. TECH STACK (ALL FREE TIER)

| Layer | Choice | Free Tier Details | Comment |
|---|---|---|---|
| Frontend framework | **Next.js** | Free | Consistent with prior projects |
| Styling/UI | **Tailwind CSS + shadcn/ui** | Free | — |
| Charts | **Recharts** | Free | Core of this project — invest extra polish here |
| Data tables | **TanStack Table** (free, open source) | Free | Product/order tables with sort/filter |
| CSV parsing | **PapaParse** | Free, open source | Client-side or server-side CSV parsing for import |
| Backend/API | **Next.js API routes** | Free | — |
| Database + Auth + Storage | **Supabase** (free tier) | **FREE** | Same pattern as prior projects |
| E-commerce data source | **Shopify Admin API**, connected to a **free Shopify Partner development store** | **FREE** for API access + free dev store | `// [NOTE]: A real client's live Shopify store requires their own paid Shopify subscription — but that's their existing cost, not a cost this app adds. This app's own operation remains free regardless.` |
| Hosting | **Vercel (free Hobby tier)** | **FREE** | — |

**Result: $0/month** to build, run, and demo — including a live Shopify integration demo using a free development store.

---

## 5. SYSTEM ARCHITECTURE

```
┌───────────────────┐   CSV Upload    ┌──────────────────────────┐        ┌─────────────────┐
│  Admin Dashboard    │───────────────▶│   Next.js App (Vercel)     │◀──────▶│    Supabase      │
│  (Products, Orders,  │               │  - Dashboard UI (Recharts) │        │  - Postgres DB   │
│   Analytics)          │               │  - CSV parser (PapaParse) │         │  - Auth          │
└───────────────────┘                 │  - API routes               │        │  - Storage        │
         ▲                             └──────────────┬──────────────┘        └─────────────────┘
         │                                             │
         │ (P1) Sync button                            ▼
         │                               ┌──────────────────────────┐
         └──────────────────────────────▶│  Shopify Admin API (free)  │
                                          │  - Pull products/orders    │
                                          └──────────────────────────┘
```

**Flow (CSV import)**: Admin uploads CSV → PapaParse parses client-side → preview/mapping screen (map CSV columns to expected fields, since real exports vary) → confirmed rows POSTed to API route → bulk insert into `orders`/`order_items` tables → triggers a recompute of aggregated analytics views.

**Flow (analytics)**: Dashboard queries pre-aggregated Postgres views (e.g., `daily_revenue`, `product_sales_summary`) rather than summing raw rows on every page load — keeps dashboard fast as order history grows.

---

## 6. DATA MODELS (Supabase / Postgres schema)

```sql
stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  shopify_domain text,          -- nullable, only set if Shopify-connected
  shopify_access_token text,    -- encrypted/stored securely, never exposed to frontend
  created_at timestamptz default now()
)

channels (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id),
  name text not null             -- 'Shopify','Amazon','Instagram/WhatsApp','Offline','Other'
)

products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id),
  sku text,
  name text not null,
  category text,
  cost_price numeric(10,2),
  sell_price numeric(10,2),
  stock_qty int default 0,
  low_stock_threshold int default 5,
  image_url text,
  created_at timestamptz default now()
)

stock_adjustments (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  change_qty int,               -- positive = restock, negative = correction/loss
  reason text,
  created_at timestamptz default now()
)

orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id),
  channel_id uuid references channels(id),
  external_order_id text,       -- Shopify order ID if synced
  customer_name text,
  status text check (status in ('paid','fulfilled','cancelled','refunded')) default 'paid',
  order_date timestamptz not null,
  total_amount numeric(10,2),
  created_at timestamptz default now()
)

order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  product_id uuid references products(id),
  quantity int not null,
  unit_price numeric(10,2),
  unit_cost numeric(10,2)        -- snapshotted at order time for accurate historical profit calc
)
```

**Aggregation views** (created for dashboard performance):
```sql
create view daily_revenue as
  select store_id, date_trunc('day', order_date) as day, sum(total_amount) as revenue, count(*) as order_count
  from orders where status != 'cancelled' group by store_id, day;

create view product_sales_summary as
  select oi.product_id, p.store_id, sum(oi.quantity) as units_sold,
         sum(oi.quantity * oi.unit_price) as revenue,
         sum(oi.quantity * (oi.unit_price - oi.unit_cost)) as profit
  from order_items oi join products p on p.id = oi.product_id
  join orders o on o.id = oi.order_id where o.status != 'cancelled'
  group by oi.product_id, p.store_id;
```

**Row-Level Security**: enable RLS; scope all access by `store_id` matching the authenticated admin's store.

---

## 7. API ENDPOINTS

| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST | `/api/products` | List/create products |
| PATCH | `/api/products/:id` | Update product (incl. stock adjustment logging) |
| POST | `/api/products/import` | Bulk CSV import (post-mapping, confirmed rows) |
| GET/POST | `/api/orders` | List/create orders |
| POST | `/api/orders/import` | Bulk CSV import for orders |
| POST | `/api/integrations/shopify/connect` | Store Shopify domain + access token |
| POST | `/api/integrations/shopify/sync` | Pull latest products/orders from Shopify Admin API |
| GET | `/api/analytics/revenue?range=` | Revenue-over-time chart data |
| GET | `/api/analytics/by-channel` | Revenue by channel |
| GET | `/api/analytics/top-products?sortBy=units|revenue` | Top products list |
| GET | `/api/analytics/profit` | Profit insights data |
| GET | `/api/alerts/low-stock` | Current low-stock products |
| GET | `/api/reports/export?range=` | CSV export of current view |

---

## 8. FOLDER STRUCTURE (Next.js App Router)

```
/app
  /(dashboard)
    /overview/page.tsx           -- main analytics dashboard
    /products/page.tsx
    /orders/page.tsx
    /orders/import/page.tsx      -- CSV upload + column-mapping wizard
    /profit/page.tsx
    /settings/integrations/page.tsx  -- Shopify connect UI
  /api
    /products/route.ts
    /products/import/route.ts
    /orders/route.ts
    /orders/import/route.ts
    /integrations/shopify/connect/route.ts
    /integrations/shopify/sync/route.ts
    /analytics/revenue/route.ts
    /analytics/by-channel/route.ts
    /analytics/top-products/route.ts
    /alerts/low-stock/route.ts
/components
  /ui/
  RevenueChart.tsx
  ChannelBreakdownChart.tsx
  TopProductsList.tsx
  LowStockWidget.tsx
  ProductTable.tsx
  CSVImportWizard.tsx
/lib
  supabaseClient.ts
  shopifyClient.ts
  csvMapper.ts
/types
  product.ts
  order.ts
```

---

## 9. FRONTEND DESIGN SPEC

### 9.1 Design Tokens

**Color palette** — data-dense, trustworthy, "financial dashboard" feel (closer to a fintech/analytics tool than a consumer app)
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#059669` (emerald) | Primary buttons, positive metrics, revenue chart line — green reinforces "money/growth" framing |
| `primary-hover` | `#047857` | Hover state |
| `bg-canvas` | `#F9FAFB` | Page background |
| `bg-surface` | `#FFFFFF` | Cards, tables |
| `border` | `#E5E7EB` | Dividers |
| `text-primary` | `#111827` | Headings/body |
| `text-secondary` | `#6B7280` | Meta, table secondary text |
| `positive` | `#059669` | Growth indicators (↑) |
| `negative` | `#DC2626` | Decline indicators (↓), low-stock alerts |
| `warning` | `#D97706` | Approaching-low-stock (not yet critical) |
| Channel colors | `Shopify #95BF47` · `Amazon #FF9900` · `Instagram/WhatsApp #E1306C`/`#25D366` · `Offline #6B7280` | Used consistently in channel breakdown chart and order tags — using each platform's real brand color makes the multi-channel chart instantly legible |

**Typography**
- Font: `Inter`
- Numbers/stats use **tabular-nums** (`font-variant-numeric: tabular-nums`) so figures align in tables and stat cards — small detail, big "professional dashboard" signal
- Scale: same as prior projects; stat-card big numbers use `text-3xl` (30px) bold, a size not needed in Projects 1–3

**Spacing & shape**
- Card-based grid layout, 16px gutter, `rounded-lg` (8px) cards
- `shadow-sm` default; stat cards have no shadow, just a `border` — flatter, more "data tool" than "consumer app"

**Icons**: `lucide-react`, plus simple brand-recognizable icons/colors for channel tags (Shopify bag, Amazon smile-arrow style icon, etc. — use free icon packs, do not use actual trademarked logos in a commercial product without checking usage terms; simple colored dot + text label is a safe default)

### 9.2 Layout — Overview Dashboard (`/overview`)

- Top row: 4 stat cards — Total Revenue (with % change vs. previous period, ↑/↓ arrow in `positive`/`negative`), Total Orders, Avg Order Value, Low Stock Alerts (count, links to alert list)
- Below: large revenue-over-time line chart (full width, ~40% of viewport height), with a period toggle (7D / 30D / 90D / 12M) top-right of the chart card
- Below that: 2-column row — Revenue by Channel (donut chart with channel-colored segments + legend) | Top Products (ranked list, toggle Units/Revenue, small bar or sparkline per row)
- Bottom: Low Stock Alerts widget — compact table (product name, current stock, threshold, est. days remaining), red-tinted rows for critical (<3 days), amber for warning

### 9.3 Layout — Products Page

- Data table (TanStack Table): image thumbnail, name, SKU, category, stock qty (with colored badge if low), cost/sell price, actions (edit, adjust stock)
- "Import CSV" button top-right opens the import wizard
- Row-level stock adjustment: inline quick-adjust (+/- buttons) for fast restocking without opening a full edit form

### 9.4 Layout — CSV Import Wizard (`/orders/import`)

- Step 1: drag-and-drop file upload zone (dashed border, `primary` on drag-hover)
- Step 2: column-mapping screen — left column shows detected CSV headers, right column has dropdowns to map each to a system field (Order Date, Customer, Product, Qty, Price, Channel); auto-guess common mappings (e.g., a column literally named "Total" maps to `total_amount` automatically) and let admin override
- Step 3: preview table of first 10 rows as they'll be imported, with a row-count summary ("247 orders ready to import") and an Import button
- Step 4: success state with a summary ("247 orders imported, 3 skipped due to missing data") — this transparency about skipped rows matters for a data-import feature to feel trustworthy

### 9.5 Component States Checklist

- **Stat cards**: default / loading (skeleton) / with-trend-arrow (positive green / negative red)
- **Stock badges**: in-stock (grey/neutral) / low-stock (amber) / out-of-stock (red)
- **Import wizard steps**: active step highlighted in `primary`, completed steps show a checkmark, disabled/future steps greyed
- **Charts**: loading skeleton (pulsing bar/line placeholder) / empty state ("No orders yet — import your first CSV or connect Shopify") / loaded

### 9.6 Responsive Breakpoints

- Dashboard stat-card row: 4 columns ≥1024px → 2 columns ≥640px → 1 column below that
- Charts stack vertically below `lg` (1024px)
- Product/order tables switch to a card-list layout (not a scrolling table) below `md` (768px) for usability on mobile

---

## 10. FREE-TIER DEPLOYMENT PLAN

1. Create free Supabase project → run schema + aggregation views → enable RLS
2. Create a **free Shopify Partner account** → create a free development store → generate an Admin API access token for the P1 integration demo
3. Push to GitHub → connect to Vercel free tier → set env vars
4. Deploy → seed demo data two ways for the pitch: (a) import a realistic sample CSV of ~200 orders across multiple channels, and (b) show the live Shopify sync pulling real products/orders from the free dev store — having **both** a CSV path and a live API path in the demo is what makes this look like a real, integration-capable product rather than a toy
5. Record a demo: overview dashboard first (strongest visual), then the CSV import wizard, then the Shopify live-sync moment

---

## 11. FUTURE PAID UPGRADE PATH (reference only)

- Additional channel integrations (Amazon Seller API, WooCommerce) — both have free API access similarly to Shopify; only genuinely paid if a client wants a managed/hosted integration service
- Supabase Pro ($25/mo) once order volume/history grows large
- Scheduled auto-sync (currently manual "Sync now" button) via a paid cron service, or free via Supabase `pg_cron` (recommend free route first — same pattern as Project 3)
- Custom domain per client

---

*End of Project 4 spec. Ready to hand to the Antigravity agent.*
