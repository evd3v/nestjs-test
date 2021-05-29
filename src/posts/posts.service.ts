import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './post.interface';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { PostNotFoundException } from './exception/postNotFound.exception';

@Injectable()
export class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  replacePost(id: number, post: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = post;
      return post;
    }

    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  createPost(post: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...post,
    };
    this.posts.push(newPost);
    return newPost;
  }

  deletePost(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);

    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
      return true;
    }

    throw new HttpException('Post now found', HttpStatus.NOT_FOUND);
  }
}