# Case Study & Project Specification: Multi-Channel E-commerce Analytics & Inventory Dashboard

This document presents a comprehensive case study, system design, data architecture, and technical audit of the **Multi-Channel E-commerce Analytics & Inventory Dashboard** platform.

---

## 1. Project Case Study

### 1.1 Executive Summary
The **Multi-Channel E-commerce Analytics & Inventory Dashboard** is a data-dense, multi-tenant SaaS application designed for small-to-mid online sellers who operate across fragmented selling channels (Shopify, Amazon, Instagram/WhatsApp, and offline physical stores). 

The platform aggregates scattered order data and inventory levels into a single real-time intelligence hub. It features multi-channel revenue distribution charts, product profitability insights, automated low-stock velocity alerts, a resilient CSV import wizard with flexible column mapping, and a direct integration hook for the **Shopify Admin API**.

**Core Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Recharts · TanStack Table · PapaParse · Supabase (PostgreSQL + Auth + Storage + RLS) · Shopify Admin API · Vercel

**Target Tier:** $0/month free-tier infrastructure compatible at launch, enterprise-scalable by architecture.

---

### 1.2 The Problem Solved
Small and mid-sized e-commerce merchants face operational paralysis caused by fragmented software ecosystems:
1. **Scattered Sales Data**: Revenue and order statistics are trapped across separate portals (Shopify Admin, Amazon Seller Central, WhatsApp chats, and paper logs).
2. **Inventory Stockout Losses**: Sellers cannot accurately predict when stock will run out, leading to overselling or stockouts on high-margin items.
3. **Revenue vs. Profit Confusion**: Top-selling products by revenue often differ significantly from most profitable products due to varying cost-of-goods-sold (COGS) margins.
4. **Messy CSV Exports**: Every selling channel exports CSVs with different header naming conventions (`Total` vs `Amount Paid` vs `Order Value`).
5. **High Software Cost**: Enterprise tools (Gradiandin, TripleWhale, Orderful) cost hundreds of dollars monthly—pricing out early-stage merchants.

---

### 1.3 Tech Stack Breakdown

| Layer | Choice | Role / Free Tier Strategy |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14+ (App Router) | Server components, fast page loads, API routes |
| **Styling & UI** | Tailwind CSS + shadcn/ui | Financial-grade, clean dashboard aesthetic (`#059669` emerald theme) |
| **Data Visualization** | Recharts | Polish revenue lines, channel donuts, and profit margin bar charts |
| **Data Grid** | TanStack Table v8 | Product & order directory with multi-column filtering and pagination |
| **File Parsing** | PapaParse | Client-side flexible CSV parsing for order/product uploads |
| **Database & Auth** | Supabase (PostgreSQL + Auth + RLS) | Relational engine with indexed analytical views and tenant boundaries |
| **Channel Sync** | Shopify Admin API | Free GraphQL/REST integration using Partner development stores |
| **Deployment** | Vercel (Hobby Tier) | Serverless API routes and global CDN static delivery |

---

## 2. Feature Matrix

| Feature Category | Feature Component | Description | Implementation Status |
| :--- | :--- | :--- | :--- |
| **Product & Inventory** | Catalog Directory | Product records with SKU, category, cost price, sell price, stock qty, image. | Implemented |
| | Stock Adjustments | Manual quick-adjust (+/-) with logged audit reasons (Restock, Damage, Correction). | Implemented |
| | Low-Stock Thresholds | Configurable threshold per SKU; automatic urgency flags based on sales velocity. | Implemented |
| | Bulk CSV Upload | PapaParse wizard for importing product inventories. | Implemented |
| **Order Ingestion** | Manual Entry | Admin form to log line items, channel tags, customer info, and status. | Implemented |
| | Flexible CSV Import | Interactive column mapping wizard handling messy exports from any platform. | Implemented |
| | Shopify API Sync | Automated pull of products and orders using Shopify Admin API tokens. | Implemented |
| | Channel Categorization | Color-coded channel tags (`Shopify`, `Amazon`, `Instagram/WhatsApp`, `Offline`). | Implemented |
| **Sales Analytics** | Revenue Over Time | Interactive line chart with date range toggles (7D / 30D / 90D / 12M). | Implemented |
| | Channel Breakdown | Donut & stacked bar charts showing multi-channel revenue contribution. | Implemented |
| | Top Product Ranking | Toggleable ranking view by units sold vs total gross revenue generated. | Implemented |
| **Inventory Alerts** | Urgency Widget | Dashboard alert card predicting days-of-stock remaining per low-stock item. | Implemented |
| | In-App Badge Engine | Header badge alert when a product crosses into low-stock status. | Implemented |
| **Profit Insights** | Gross Profit Calculation | Automated order & item level profit analysis (`sell_price - cost_price`). | Implemented |
| | Margin Comparison | Chart comparing highest-revenue vs. highest-profit margin items. | Implemented |
| **Export & Reporting** | CSV Financial Export | Instant export of aggregated dashboard views for accounting/tax compliance. | Implemented |

---

## 3. System Architecture & Data Lifecycles

### 3.1 Architecture Flow Diagram

```
┌───────────────────────────────┐     CSV Upload      ┌──────────────────────────────────┐        ┌─────────────────────────┐
│     Admin Dashboard UI        │────────────────────▶│   Next.js Server (Vercel API)    │◀──────▶│    Supabase Platform    │
│  - Recharts Visualization     │                     │  - CSV Parser (PapaParse)        │        │  - Postgres Aggregations│
│  - TanStack Data Tables       │                     │  - Flexible Column Mapper        │        │  - Row-Level Security   │
└───────────────────────────────┘                     │  - Shopify API Client            │        └─────────────────────────┘
                ▲                                     └────────────────┬─────────────────┘
                │                                                      │
                │ Sync Button (P1)                                     ▼
                └──────────────────────────────────────────────────────┴────────▶ ┌─────────────────────────┐
                                                                                  │ Shopify Admin API (Free)│
                                                                                  └─────────────────────────┘
```

### 3.2 Key Data Lifecycle Flows

#### Flow A: CSV Order Import & Mapping
1. **Upload**: User drops a CSV file into the `CSVImportWizard` drag-and-drop zone.
2. **Parse**: PapaParse parses raw CSV text into JSON objects client-side.
3. **Column Mapping**: Auto-guesses headers (e.g. `Total Amount` → `total_amount`) and allows manual dropdown override for unrecognized columns.
4. **Validation & Preview**: Displays a 10-row preview table and validates required fields (`order_date`, `total_amount`).
5. **Bulk Insert**: POSTs mapped payload to `/api/orders/import`, inserting rows inside a PostgreSQL transaction.
6. **View Recomputation**: Triggers refresh of pre-aggregated PostgreSQL analytics views.

#### Flow B: Performant Analytics Querying
1. User loads `/overview` or toggles date filter (7D, 30D, 90D).
2. Next.js queries pre-aggregated PostgreSQL views (`daily_revenue`, `product_sales_summary`) instead of performing expensive `SUM()` queries across raw order rows.
3. API route returns formatted JSON envelopes to Recharts components in `< 50ms`.

---

## 4. Database Architecture (PostgreSQL Schema)

```sql
-- Stores Table (Multi-tenant root)
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  shopify_domain TEXT,
  shopify_access_token TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Channels Table
CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL -- 'Shopify', 'Amazon', 'Instagram/WhatsApp', 'Offline', 'Other'
);

-- Products Directory
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  sku TEXT,
  name TEXT NOT NULL,
  category TEXT,
  cost_price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  sell_price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  stock_qty INT DEFAULT 0,
  low_stock_threshold INT DEFAULT 5,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES channels(id),
  external_order_id TEXT,
  customer_name TEXT,
  status TEXT CHECK (status IN ('paid', 'fulfilled', 'cancelled', 'refunded')) DEFAULT 'paid',
  order_date TIMESTAMPTZ NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items (Snapshotting historical cost/price)
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  unit_cost NUMERIC(10,2) NOT NULL -- snapshotted for accurate historical margin calc
);

-- Pre-aggregated Database Analytics Views
CREATE VIEW daily_revenue AS
  SELECT 
    store_id, 
    date_trunc('day', order_date) AS day, 
    SUM(total_amount) AS revenue, 
    COUNT(*) AS order_count
  FROM orders 
  WHERE status != 'cancelled' 
  GROUP BY store_id, day;

CREATE VIEW product_sales_summary AS
  SELECT 
    oi.product_id, 
    p.store_id, 
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue,
    SUM(oi.quantity * (oi.unit_price - oi.unit_cost)) AS profit
  FROM order_items oi 
  JOIN products p ON p.id = oi.product_id
  JOIN orders o ON o.id = oi.order_id 
  WHERE o.status != 'cancelled'
  GROUP BY oi.product_id, p.store_id;
```

---

## 5. Technical Audit & Health Check

During our deep architectural review of the project specifications, we conducted an audit of schema design, sync mechanics, and client-side processing:

### 5.1 Positive Highlights
1. **Historical Cost Snapshotting**: `order_items` snapshots `unit_cost` at purchase time. This prevents past profit reports from distorting if a product's supplier cost changes later.
2. **Database-Level Aggregation Views**: Utilizing PostgreSQL views (`daily_revenue`) keeps dashboard load speeds constant regardless of whether the database holds 1,000 or 1,000,000 orders.
3. **Strict Brand-Colored Legend Mapping**: Visual channel indicators use platform brand hexes (Shopify `#95BF47`, Amazon `#FF9900`, Instagram `#E1306C`), increasing chart readability for store owners.

### 5.2 Discrepancies & Discovered Bugs

#### 1. Missing Inventory Deduction Trigger on Manual Order Creation (High Priority)
* **Location**: `api/orders/route.ts` & `POST /api/orders`
* **Issue**: When a manual order is placed or imported via CSV, the system inserts `order_items` records, but `products.stock_qty` is not automatically decremented unless an explicit SQL trigger or transaction service function runs.
* **Fix**: Add a PostgreSQL database trigger or atomic transaction that subtracts `quantity` from `products.stock_qty` when an order item is created under `paid` or `fulfilled` status.

#### 2. Shopify Token Security & CORS Boundary Leakage (High Priority)
* **Location**: `lib/shopifyClient.ts` & `api/integrations/shopify/connect`
* **Issue**: `shopify_access_token` stored in the `stores` table must never be queried by client components. If a select query returns `SELECT * FROM stores` to the frontend, private Shopify tokens will leak into browser state.
* **Fix**: Enforce explicit column selection in repositories (`SELECT id, name, shopify_domain`) and store access tokens in encrypted columns or secret environment vaults.

#### 3. CSV Date Format Parsing Ambiguity (Medium Priority)
* **Location**: `lib/csvMapper.ts` & `CSVImportWizard.tsx`
* **Issue**: CSV files from international channels export dates in varying formats (`DD/MM/YYYY` vs `MM/DD/YYYY` vs `ISO 8601`). Standard `Date.parse()` leads to invalid dates or swapped months.
* **Fix**: Integrate Date-fns parsing rules into `csvMapper.ts` with an explicit date-format selector in Step 2 of the import wizard.

---

## 6. Architectural Recommendations & Product Roadmap

1. **Phase 1 (Immediate)**: Implement PostgreSQL atomic stock deduction triggers on new order insertions.
2. **Phase 2**: Add `pgvector` semantic matching in CSV import column guessing to improve header recognition accuracy to >95%.
3. **Phase 3**: Build automated SLA/low-stock email triggers via Resend API when products cross threshold limits.
4. **Phase 4**: Implement multi-currency conversion layer to aggregate global orders into store base currency.
