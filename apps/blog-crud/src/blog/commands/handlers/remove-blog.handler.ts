import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveBlogCommand } from '../impl/remove-blog.command';
import { blogArray } from 'db/blog/blog-array';

@CommandHandler(RemoveBlogCommand)
export class RemoveBlogCommandHandler
  implements ICommandHandler<RemoveBlogCommand>
{
  async execute(command: RemoveBlogCommand) {
    let { id, token } = command;
    let index = blogArray.findIndex((item) => item.id === id.id);
    if (index != -1) {
      let target = blogArray[index];
      blogArray.splice(index, 1);
      return { message: 'data with id ' + id.id + 'deleted successfully' };
    }
    return {
      message: 'data with id ' + id.id + ' not found',
    };
  }
}
