import { Post } from "./product.interface";




export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

