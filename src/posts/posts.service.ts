import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ){}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findById(id: string): Promise<Post> {
    const post =  await this.postRepository.findOneBy({ id });
    if(!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { title, description } = createPostDto;
    const post = this.postRepository.create({
      title,
      description,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    });
    await this.postRepository.save(post);
    return post;
  }

  async update(updatePostDto: UpdatePostDto, id: string) {
    const { title, description } = updatePostDto;
    const post = await this.findById(id);
    post.title = title;
    post.description = description;
    await this.postRepository.save(post);
    return post;
  }

  async delete(id: string): Promise<void> {
    await this.postRepository.delete({ id });
  }
}
