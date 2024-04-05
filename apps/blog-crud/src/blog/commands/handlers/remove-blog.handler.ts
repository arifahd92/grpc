import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveBlogCommand } from '../impl/remove-blog.command';

@CommandHandler(RemoveBlogCommand)
export class RemoveBlogCommandHandler
  implements ICommandHandler<RemoveBlogCommand>
{
  async execute(command: RemoveBlogCommand) {
    let { id, token } = command;
    return 'jjjj';
  }
}
