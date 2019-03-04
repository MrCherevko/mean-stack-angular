import { PostsService } from './../post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  posts: Post[] = [];
  postsSubscribtion: Subscription;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private postService: PostsService){}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSubscribtion = this.postService.getPostUpdateListener()
      .subscribe(
        (postData: {posts: Post[], postCount: number}) => {
          this.isLoading = false;
          this.posts = postData.posts;
          this.totalPosts = postData.postCount;
        }
    );
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postService.deletePost(postId)
      .subscribe(() => {
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  ngOnDestroy() {
    this.postsSubscribtion.unsubscribe();
  }

}
