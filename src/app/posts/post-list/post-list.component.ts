import { PostsService } from './../post.service';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostsService){
    this.posts = this.postService.getPosts();
  }

  ngOnInit() {
  }

}
