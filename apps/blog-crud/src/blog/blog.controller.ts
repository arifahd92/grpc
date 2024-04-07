/*import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
// import { hero } from './proto/hero';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { blog } from 'proto/blog';
@Controller()
export class BlogController {
  @GrpcMethod('BlogsService', 'CreateBlog')
  create(
    data: blog.CreateBlogDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): blog.CreateBlogDto {
    console.log(data);

    return 
  }
}
*/
import { Controller } from '@nestjs/common';

import { BlogService } from './blog.service';

import { Metadata, MetadataValue, ServerUnaryCall } from '@grpc/grpc-js';
import { blog } from './proto/blog';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @GrpcMethod('BlogsService', 'CreateBlog')
  createBlog(
    createBlogDto: blog.CreateBlogDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    // console.log('metadata inside controller create blog');
    // console.log({ metadata });
    let token: MetadataValue[] | undefined = metadata.get('token');
    // console.log(token[0], 'inside controller');
    return this.blogService.create(createBlogDto, token[0]);
  }
  @GrpcMethod('BlogsService', 'FindAllBlogs')
  findAllBlogs(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(`inside findAll blogs now metadata`);

    let token: MetadataValue[] | undefined = metadata.get('token');
    console.log(token[0], 'inside controller');

    return this.blogService.findAll(token[0]);
  }
  @GrpcMethod('BlogsService', 'FindOneBlog')
  findOneBlog(id: string, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(`find one blog `);
    let token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.findOne(id, token[0]);
  }
  @GrpcMethod('BlogsService', 'UpdateBlog')
  updateBlog(
    updateBlogDto: blog.UpdateBlogDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log(`update blog`);
    let token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.update(updateBlogDto.id, updateBlogDto, token[0]);
  }
  @GrpcMethod('BlogsService', 'RemoveBlog')
  removeBlog(id: string, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(`remove controller`);
    let token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.remove(id, token[0]);
  }
}
