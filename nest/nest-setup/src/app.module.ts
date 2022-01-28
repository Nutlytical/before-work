import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { UsersModule } from './users-orm/users.module';
import { BlogsModule } from './blogs-gql/blogs.module';
import { ProductsModule } from './products-prisma/products.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    BlogsModule,
    ProductsModule,
  ],
})
export class AppModule {}
