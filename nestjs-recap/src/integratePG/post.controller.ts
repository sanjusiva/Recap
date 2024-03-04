import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    console.log('get call');
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity[]> {
    console.log('cont');
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() post: PostEntity,
  ): Promise<PostEntity> {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.postService.remove(id);
  }
}
