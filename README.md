# 🛍️ Kalayab

> Smart product search & price comparison engine

کالایاب (Kalayab) یک موتور هوشمند جستجو و مقایسه قیمت محصولات است که با هدف جمع‌آوری قیمت از فروشگاه‌های مختلف و پیدا کردن بهترین پیشنهاد برای کاربر ساخته می‌شود.

این پروژه در حال توسعه است و Backend آن با NestJS + TypeScript طراحی شده است.

---

## 🚀 Project Status

🟡 In Development

هسته اولیه Backend پیاده‌سازی شده و معماری Scraper Engine در حال توسعه است.

### Current Progress

- [x] NestJS project setup
- [x] Products module
- [x] Product data model
- [x] Product search API
- [x] Scraper interface
- [x] Scraper Manager
- [x] Dependency Injection for Scrapers
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

The backend is designed around a modular and extensible scraping architecture.

`text
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
The Scraper interface provides a common contract for all store scrapers, allowing new stores to be added without changing the core scraping logic.
📁 Project Structure
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
🔌 API
Search Products
GET /products/search?q={query}
Example:
GET /products/search?q=iphone
Current response:
{
  "query": "iphone",
  "results": [
    {
      "id": "mock-iphone-15",
      "title": "iphone 128GB",
      "price": 61000000,
      "currency": "IRT",
      "store": {
        "name": "Mock Store"
      },
      "availability": true
    }
  ]
}
The current implementation uses a Mock Scraper. Real store integrations are planned for upcoming development stages.
🧩 Product Model
Products are normalized into a common structure:
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
This allows products collected from different stores to follow a consistent structure.
🕷️ Scraper System
Every scraper implements the common Scraper interface:
interface Scraper {
  search(query: string): Promise<Product[]>;
}
This makes the system extensible.
For example, future integrations can follow the same architecture:
scrapers/
├── digikala/
├── torob/
├── emalls/
└── ...
🛠️ Tech Stack
Backend
Node.js
NestJS
TypeScript
Planned Infrastructure
PostgreSQL
Redis
RabbitMQ
Docker
Testing
Jest
⚙️ Installation
Clone the repository:
git clone https://github.com/YOUR_USERNAME/kalayab-backend.git
Enter the project:
cd kalayab-backend
Install dependencies:
npm install
Run development server:
npm run start:dev
The API will be available at:
http://localhost:3000
🧪 Running Tests
Run unit tests:
npm test
Run tests in watch mode:
npm run test:watch
🎯 Roadmap
Phase 1 — Backend Core
[x] Project architecture
[x] Product module
[x] Scraper abstraction
[x] Scraper Manager
[x] Mock scraper
[x] Unit testing
Phase 2 — Real Scraping
[ ] HTTP client
[ ] First real store scraper
[ ] HTML parsing
[ ] Product extraction
[ ] Error handling
[ ] Timeout & retry mechanism
[ ] Scraper logging
Phase 3 — Price Engine
[ ] Multi-store search
[ ] Product normalization
[ ] Price comparison
[ ] Best-price detection
[ ] Availability detection
Phase 4 — Data Layer
[ ] PostgreSQL
[ ] Redis cache
[ ] Product persistence
[ ] Search history
[ ] Price history
Phase 5 — Smart Features
[ ] Price drop detection
[ ] Price alerts
[ ] Product tracking
[ ] Recommendation engine
🔐 Environment Variables
Environment configuration will be added as external services are introduced.
Example:
PORT=3000

DATABASE_URL=

REDIS_URL=

RABBITMQ_URL=
Never commit real credentials or secret keys to the repository.
📌 Development Philosophy
Kalayab is being built with a focus on:
Modular architecture
Separation of concerns
Extensible scraper system
Clean TypeScript code
Testable services
Scalable backend architecture
The goal is to make adding a new store as simple as implementing a new scraper without modifying the core search engine.
📈 Project Vision
Kalayab aims to evolve from a simple price comparison service into a smart shopping engine.
The long-term vision is:
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
👨‍💻 Author
Mehran
Backend Developer & Builder
⭐ Project
If you find this project interesting, consider giving it a ⭐ on GitHub.
🚧 Kalayab is currently under active development.