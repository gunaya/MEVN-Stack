import { IPost } from "./model";
import posts from './schema';

export default class PostService {
    public createPost(post_params: IPost, callback: any){
        const _session = new posts(post_params);
        _session.save(callback);
    }
}