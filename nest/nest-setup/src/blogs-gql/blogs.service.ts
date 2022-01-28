import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Blog, CreateBlogInput } from './blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  createBlog(payload: CreateBlogInput): Promise<Blog> {
    const newBlog = this.blogsRepository.create({
      ...payload,
    });

    return this.blogsRepository.save(newBlog);
  }

  findAllBlog(): Promise<Blog[]> {
    return this.blogsRepository.find();
  }

  findOneBlog(id: string): Promise<Blog> {
    return this.blogsRepository.findOne(id);
  }

  async deleteBlog(id: string): Promise<void> {
    await this.blogsRepository.delete(id);
  }
}
