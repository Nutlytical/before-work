import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createUser(@Body() body: Prisma.ProductCreateInput): Promise<Product> {
    return this.productsService.createProduct(body);
  }

  @Get()
  findAllProduct(): Promise<Product[]> {
    return this.productsService.findAllProduct();
  }

  @Get('/:productId')
  findOneProduct(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.findOneProduct(productId);
  }

  @Delete()
  deleteUser(@Body() body: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.productsService.deleteProduct(body);
  }
}
