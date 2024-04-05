// import { CreateBlogDto, UpdateBlogDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/impl/create-blog.command';
import { FindAllQuery } from './queries/impl/findAll-blog.query';
import { FindOneQuery } from './queries/impl/findOne-blog.query';
import { UpdateBlogCommand } from './commands/impl/update-blog.command';
import { RemoveBlogCommand } from './commands/impl/remove-blog.command';
import { ClientGrpc } from '@nestjs/microservices';
import { blog } from './proto/blog';
import { auth } from 'apps/auth/src/proto/auth';

@Injectable()
export class BlogService implements OnModuleInit {
  //BlogsService

  private authProtoService: auth.AdminService;

  constructor(
    @Inject('AUTH_SERVICE') private client: ClientGrpc,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit() {
    this.authProtoService =
      this.client.getService<auth.AdminService>('AdminService'); //AdminService is from generated proto file
  }
  create(createBlogDto: blog.CreateBlogDto, token: any) {
    console.log({ createBlogDto });
    return this.commandBus.execute(new CreateBlogCommand(createBlogDto, token));
  }

  findAll(token: any) {
    return this.queryBus.execute(new FindAllQuery(token));
  }

  findOne(id: string, token: any) {
    return this.queryBus.execute(new FindOneQuery(id, token));
  }

  update(id: string, updateBlogDto: blog.UpdateBlogDto, token: any) {
    return this.commandBus.execute(
      new UpdateBlogCommand(id, updateBlogDto, token),
    );
  }

  remove(id: any, token: any) {
    console.log(`inside remove service`);
    return this.commandBus.execute(new RemoveBlogCommand(id, token));
  }
}
