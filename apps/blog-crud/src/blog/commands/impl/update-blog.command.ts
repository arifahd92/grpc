// import { UpdateBlogDto } from "@app/common";

import { blog } from '../../proto/blog';

// import { blog } from 'proto/blog';

export class UpdateBlogCommand {
  constructor(
    public readonly id: string,
    public readonly updateBlogDto: blog.UpdateBlogDto,
    public readonly token: string,
  ) {}
}
