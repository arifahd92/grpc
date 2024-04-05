import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { Blog, blogArray, blogResponse } from '@app/common';

import { CreateBlogCommand } from '../impl/create-blog.command';

@CommandHandler(CreateBlogCommand)
export class CreateBlogCommandHandler
  implements ICommandHandler<CreateBlogCommand>
{
  async execute(command: CreateBlogCommand) {
    const { createBlogDto, token } = command;
  }
}
