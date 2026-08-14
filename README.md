# 🛍️ Kalayab

> Smart Product Search & Price Comparison Engine

**کالایاب (Kalayab)** یک موتور هوشمند جستجو و مقایسه قیمت محصولات است که با هدف جمع‌آوری قیمت از فروشگاه‌های مختلف و پیدا کردن بهترین پیشنهاد برای کاربر ساخته می‌شود.

این پروژه در حال توسعه است و Backend آن با **NestJS + TypeScript** طراحی شده است.

---

## 🚀 Project Status

🟡 **In Development**

هسته اولیه Backend پیاده‌سازی شده و معماری Scraper Engine در حال توسعه است.

### Current Progress

- [x] NestJS project setup
- [x] Products module
- [x] Product data model
- [x] Product search API
- [x] Scraper interface
- [x] Scraper Manager
- [x] Dependency Injection
- [x] Mock Scraper
- [x] ProductsService integration
- [x] Unit tests
- [ ] Real store scrapers
- [ ] Product normalization
- [ ] Multi-store price comparison
- [ ] PostgreSQL integration
- [ ] Redis caching
- [ ] Price history
- [ ] Price alerts
- [ ] Authentication
- [ ] Frontend

---

## 🧠 Architecture

```text
                         ┌─────────────────────┐
                         │       Client        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ ProductsController  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   ProductsService   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   ScraperManager    │
                         └──────────┬──────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 ▼                  ▼                  ▼
          ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
          │  Scraper A  │    │  Scraper B  │    │  Scraper C  │
          └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
                 │                  │                  │
                 └──────────────────┼──────────────────┘
                                    ▼
                              Product[]
```

The `Scraper` interface provides a common contract for all store scrapers, allowing new stores to be added without changing the core scraping logic.

---

## 📁 Project Structure

```text
src/
└── modules/
    │
    ├── app/
    │
    ├── products/
    │   ├── product.interface.ts
    │   ├── products.controller.ts
    │   ├── products.service.ts
    │   ├── products.module.ts
    │   └── products.service.spec.ts
    │
    └── scrapers/
        ├── scraper.interface.ts
        ├── scraper.manager.ts
        ├── scraper.tokens.ts
        ├── scrapers.module.ts
        │
        └── mock/
            └── mock.scraper.ts
```

---

## 🔌 API

### Search Products

```http
GET /products/search?q={query}
```

### Example

```http
GET /products/search?q=iphone
```

### Response

```json
{
  "query": "iphone",
  "results": [
    {
      "id": "mock-iphone-15",
      "title": "iphone 128GB",
      "url": "https://example.com/product/iphone-15",
      "price": 61000000,
      "currency": "IRT",
      "store": {
        "name": "Mock Store",
        "url": "https://example.com"
      },
      "availability": true
    }
  ]
}
```

> The current implementation uses a Mock Scraper. Real store integrations will be added in upcoming development stages.

---

## 🧩 Product Model

Products are normalized into a common structure:

```typescript
interface Product {
  id: string;

  title: string;

  url: string;

  image?: string;

  price: number;

  currency: 'IRR' | 'IRT';

  store: {
    name: string;
    url: string;
    logo?: string;
  };

  availability: boolean;

  scrapedAt: Date;
}
```

---

## 🕷️ Scraper System

Every scraper implements the common `Scraper` interface:

```typescript
interface Scraper {
  search(query: string): Promise<Product[]>;
}
```

This architecture allows new stores to be added independently.

Future structure:

```text
scrapers/
├── digikala/
├── torob/
├── emalls/
└── ...
```

---

## 🛠️ Tech Stack

### Backend

- **Node.js**
- **NestJS**
- **TypeScript**

### Testing

- **Jest**

### Planned Infrastructure

- **PostgreSQL**
- **Redis**
- **RabbitMQ**
- **Docker**

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/kalayab-backend.git
```

Enter the project:

```bash
cd kalayab-backend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

---

## 🧪 Testing

Run unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

---

## 🗺️ Roadmap

### Phase 1 — Backend Core

- [x] Project architecture
- [x] Product module
- [x] Product interface
- [x] Scraper interface
- [x] Scraper Manager
- [x] Mock Scraper
- [x] Dependency Injection
- [x] Unit testing

### Phase 2 — Real Scraping

- [ ] HTTP client
- [ ] First real store scraper
- [ ] HTML parsing
- [ ] Product extraction
- [ ] Error handling
- [ ] Timeout handling
- [ ] Retry mechanism
- [ ] Scraper logging

### Phase 3 — Price Engine

- [ ] Multi-store search
- [ ] Product normalization
- [ ] Price comparison
- [ ] Best-price detection
- [ ] Availability detection

### Phase 4 — Data Layer

- [ ] PostgreSQL
- [ ] Redis cache
- [ ] Product persistence
- [ ] Search history
- [ ] Price history

### Phase 5 — Smart Features

- [ ] Price drop detection
- [ ] Price alerts
- [ ] Product tracking
- [ ] Recommendation engine

---

## 🔐 Environment Variables

Example:

```env
PORT=3000

DATABASE_URL=

REDIS_URL=

RABBITMQ_URL=
```

> Never commit real credentials or secret keys to the repository.

---

## 📐 Development Philosophy

Kalayab is being built with a focus on:

- Modular architecture
- Separation of concerns
- Extensible scraper system
- Clean TypeScript code
- Testable services
- Scalable backend architecture

The goal is to make adding a new store as simple as implementing a new scraper without modifying the core search engine.

---

## 🎯 Project Vision

Kalayab aims to evolve from a simple price comparison service into a **smart shopping engine**.

```text
Search
   ↓
Discover
   ↓
Compare
   ↓
Analyze
   ↓
Find the Best Deal
   ↓
Track Price
   ↓
Notify User
```

---

## 👨‍💻 Author

**Mehran**

Backend Developer & Builder

---

## ⭐ Support

If you find this project interesting, consider giving it a ⭐ on GitHub.

---

> 🚧 Kalayab is currently under active development.