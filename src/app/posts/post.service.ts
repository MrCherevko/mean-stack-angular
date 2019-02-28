import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PostsService {

    constructor(private http: HttpClient, private router: Router) {}

    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                }
            });
        }))
        .subscribe(
            transformedPosts => {
                this.posts = transformedPosts;
                this.postUpdated.next([...this.posts]);
            }
        );
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        this.http
        .post<{message: string, postId: string}>
        ('http://localhost:3000/api/posts',postData)
        .subscribe(
            (response) => {
                const post: Post = {id: response.postId, title, content}
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            }
        );
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    getPost(id: string) {
        return this.http.get<{_id: string,title: string, content: string}>('http://localhost:3000/api/posts/' + id);
    }

    updatePost(id: string, title: string, content: string) {
        const post: Post = { id, title,content };
        this.http.put('http://localhost:3000/api/posts/' + id, post)
        .subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            const updatedPost = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPost;
            this.postUpdated.next([...this.posts]);
        })
    }
}