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

  constructor(private postService: PostsService){}

  ngOnInit() {
    this.postService.getPosts();
    this.postsSubscribtion = this.postService.getPostUpdateListener()
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
    );
  }

  ngOnDestroy() {
    this.postsSubscribtion.unsubscribe();
  }

}
