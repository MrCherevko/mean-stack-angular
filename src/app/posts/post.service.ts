import { Post } from './post.model';
import { Subject } from 'rxjs';
export class PostsService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    addPost(title: string, content: string) {
        const post: Post = {title,content};
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
}