import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog } from './blog.entity';
import { BlogsResolver } from './blogs.resolver';
import { BlogsService } from './blogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogsResolver, BlogsService],
})
export class BlogsModule {}
