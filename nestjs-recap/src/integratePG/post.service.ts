import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(postId: any): Promise<Post[]> {
    try {
      const posts = await this.postRepository.find({ where: { postId } });

      if (!posts || posts.length === 0) {
        throw new NotFoundException(`Posts with postId ${postId} not found`);
      }

      return posts;
    } catch (error) {
      throw new NotFoundException(`Error fetching posts: ${error.message}`);
    }
  }

  async create(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async update(postId: any, post: Post): Promise<Post> {
    try {
      const existingPost = await this.postRepository.findOne({
        where: { postId },
      });

      if (!existingPost) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }

      const updatedPost = await this.postRepository.save({
        ...existingPost,
        ...post,
      });

      return updatedPost;
    } catch (error) {
      throw new NotFoundException(`Error updating post: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
