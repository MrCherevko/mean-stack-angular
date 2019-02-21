import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PostsService {

    constructor(private http: HttpClient) {}

    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    getPosts() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe(
            (response) => {
                this.posts = response.posts;
                this.postUpdated.next([...this.posts]);
            }
        );
    }

    addPost(title: string, content: string) {
        const post: Post = {id: null,title,content};
        this.http.post<{message: string}>('http://localhost:3000/api/posts',post).subscribe(
            (response) => {
                console.log(response.message);
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
            }
        );
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
}