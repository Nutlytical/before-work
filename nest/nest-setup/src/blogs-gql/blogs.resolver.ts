import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Blog, CreateBlogInput } from './blog.entity';

import { BlogsService } from './blogs.service';

@Resolver()
export class BlogsResolver {
  constructor(private blogsService: BlogsService) {}

  @Mutation(() => Blog)
  createBlog(@Args('input') input: CreateBlogInput): Promise<Blog> {
    return this.blogsService.createBlog(input);
  }

  @Query(() => [Blog], { nullable: 'items' })
  findAllBlog(): Promise<Blog[]> {
    return this.blogsService.findAllBlog();
  }

  @Query(() => Blog, { nullable: true })
  findOneBlog(@Args('blogId') blogId: string): Promise<Blog> {
    return this.blogsService.findOneBlog(blogId);
  }

  @Mutation(() => Blog, { nullable: true })
  deleteBlog(@Args('blogId') blogId: string): Promise<void> {
    return this.blogsService.deleteBlog(blogId);
  }
}
