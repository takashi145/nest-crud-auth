import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postsService.create(createPostDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() updatePostDto: UpdatePostDto, 
    @Param('id') id: number
  ): Promise<PostEntity> {
    return await this.postsService.update(updatePostDto, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: number
  ): Promise<void> {
    await this.postsService.delete(id);
    res.status(204);
  }
}
