import { Module } from "@nestjs/common";
import { ScraperManager } from "./scraper.manager";
import { MockScraper } from "./mock/mock.scraper";
import { SCRAPERS } from "./scraper.token";


@Module({
  providers:[MockScraper,
    {

      provide:SCRAPERS,
      useFactory:(mockScraper:MockScraper)=>[mockScraper],
      inject:[MockScraper]
    },
    {
      provide:ScraperManager,
      useFactory:(scrapers)=>new ScraperManager(scrapers),
      inject:[SCRAPERS]
    }
  ],
  exports:[ScraperManager]
})
export class ScraperModule{}