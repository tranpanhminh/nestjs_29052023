import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Định nghĩa Route
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHomepage(): string {
    return this.appService.getHomepage();
  }

  // Overview
  @Get('/overview')
  getOverview(): string {
    return this.appService.getOverview();
  }

  // Products
  @Get('/products')
  getProducts(): string {
    return this.appService.getProducts();
  }

  @Get('/users/:id')
  getUsers(@Param() param, @Query() query): string {
    console.log(param, 'PARAM');
    console.log(query, 'QUERY');
    return this.appService.getUsers();
  }

  // Page Not Found
  @Get('*')
  getPageNotFound(): string {
    return this.appService.getPageNotFound();
  }
}
