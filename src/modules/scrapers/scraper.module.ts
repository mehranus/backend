import { Module } from "@nestjs/common";
import { ScraperManager } from "./scraper.manager";
import { MockScraper } from "./mock/mock.scraper";
import { SCRAPERS } from "./scraper.token";
import { HttpModule } from "@nestjs/axios";
import { TorobScraper } from "./torob/torob.scraper";
import { ScraperInterface } from "./scrapers.interface";


@Module({
  imports:[HttpModule],
  providers: [
  MockScraper,
  TorobScraper,

  {
    provide: SCRAPERS,
    useFactory: (
      mockScraper: MockScraper,
      torobScraper: TorobScraper,
    ) => [mockScraper, torobScraper],
    inject: [MockScraper, TorobScraper],
  },

  {
    provide: ScraperManager,
    useFactory: (scrapers: ScraperInterface[]) =>
      new ScraperManager(scrapers),
    inject: [SCRAPERS],
  },
],
  exports:[ScraperManager]
})
export class ScraperModule{}