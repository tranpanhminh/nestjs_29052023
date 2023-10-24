import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Homepage
  getHomepage(): string {
    return 'This is homepage page';
  }

  // Overview
  getOverview(): string {
    return 'This is overview page';
  }

  // Products
  getProducts(): string {
    return 'This is product page';
  }

  getUsers(): string {
    return 'Users Lists';
  }

  // Page Not Found
  getPageNotFound(): string {
    return 'Page Not Found';
  }
}
