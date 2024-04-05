import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JwtService } from '@nestjs/jwt';

import { UpdateBlogCommand } from '../impl/update-blog.command';

@CommandHandler(UpdateBlogCommand)
export class UpdateBlogCommandHandler
  implements ICommandHandler<UpdateBlogCommand>
{
  constructor(private jwtService: JwtService) {}

  async execute(command: UpdateBlogCommand) {
    const { updateBlogDto, token } = command;
  }
}
