import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Post as PostEntity } from 'src/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService
  ){}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postsService.create(createPostDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findById(id);
  }

  @Put(':id')
  async update(
    @Body() updatePostDto: UpdatePostDto, 
    @Param('id') id: string
  ): Promise<PostEntity> {
    return await this.postsService.update(updatePostDto, id);
  }

  @Delete(':id')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ): Promise<void> {
    await this.postsService.delete(id);
    res.status(204);
  }
}
