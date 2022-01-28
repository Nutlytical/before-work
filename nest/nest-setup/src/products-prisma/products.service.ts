import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  findAllProduct(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findOneProduct(productId: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });
  }

  deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }
}
