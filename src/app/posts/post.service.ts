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
    private postUpdated = new Subject<{posts: Post[], postCount: number}>();

    getPosts(postPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
        this.http.get<{message: string, posts: any, maxPosts: number}>
        ('http://localhost:3000/api/posts' + queryParams)
        .pipe(map((postData) => {
            return { posts: postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id,
                    imagePath: post.imagePath,
                    creator: post.creator
                }
            }),
            maxPosts: postData.maxPosts };
        }))
        .subscribe(
            transformedPostsData => {
                this.posts = transformedPostsData.posts;
                this.postUpdated.next({posts: [...this.posts], postCount: transformedPostsData.maxPosts});
            }
        );
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        this.http
        .post<{message: string, post: Post}>
        ('http://localhost:3000/api/posts',postData)
        .subscribe(
            (response) => {
                this.router.navigate(['/']);
            }
        );
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    getPost(id: string) {
        return this.http
        .get<{_id: string,title: string, content: string, imagePath: string, creator: string}>
        ('http://localhost:3000/api/posts/' + id);
    }

    updatePost(id: string, title: string, content: string, imagePath: File | string) {
        let postData: Post | FormData;
        if(typeof imagePath === 'object') {
            postData = new FormData();
            postData.append('id', id);
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', imagePath, title);
        } else {
            postData = { 
                id,
                title,
                content,
                imagePath,
                creator: null
            };
        }
        this.http.put('http://localhost:3000/api/posts/' + id, postData)
        .subscribe(response => {
            this.router.navigate(['/']);
        });
    }

    deletePost(postId: string) {
        return this.http.delete('http://localhost:3000/api/posts/' + postId);
    }
}