import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ScraperManager } from '../scrapers/scraper.manager';

import {
  describe,
  it,
  expect,
  beforeEach,
  jest,
} from '@jest/globals';

describe('ProductsService', () => {
  let service: ProductService;

  const mockScraperManager = {
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ScraperManager,
          useValue: mockScraperManager,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});