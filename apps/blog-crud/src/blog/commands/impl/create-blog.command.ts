// import { CreateBlogDto } from "@app/common";

import { blog } from '../../proto/blog';

export class CreateBlogCommand {
  constructor(
    public readonly createBlogDto: blog.CreateBlogDto,
    public readonly token: string,
  ) {}
}
