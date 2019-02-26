import { PostsService } from './../post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  posts: Post[] = [];
  postsSubscribtion: Subscription;
  isLoading = false;

  constructor(private postService: PostsService){}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSubscribtion = this.postService.getPostUpdateListener()
      .subscribe(
        (posts: Post[]) => {
          this.isLoading = false;
          this.posts = posts;
        }
    );
  }

  onDelete(postId: string){
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSubscribtion.unsubscribe();
  }

}
