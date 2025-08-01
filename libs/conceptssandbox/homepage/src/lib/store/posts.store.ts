import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { Post } from '../models/product.interface';
import { environment } from 'apps/AngularConceptsSandbox/src/app/environments/environment';
import { PostsState } from '../models/posts-state.interface';

// Wird hier definiert, um den Zustand der Posts zu verwalten
const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    hasPosts: computed(() => store.posts().length > 0),
  })),

  withMethods((store) => ({
    async getAllPosts() {
      patchState(store, { isLoading: true, error: null });
      try {
        const response = await fetch(environment.apiUrls.posts);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const postsData = await response.json();
        patchState(store, { posts: postsData, isLoading: false });
      } catch (error: any) {
        patchState(store, { error: error.message, isLoading: false });
      }
    },

    async createPost(post: Omit<Post, 'id'>) {
      patchState(store, { isLoading: true, error: null });
      try {
        const response = await fetch(environment.apiUrls.posts, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newPost = await response.json();
        patchState(store, {
          posts: [...store.posts(), newPost],
          isLoading: false,
        });
      } catch (error: any) {
        patchState(store, { error: error.message, isLoading: false });
      }
    },

    async updatePostById(id: number, post: Post): Promise<void> {
      patchState(store, { isLoading: true, error: null });
      try {
        const response = await fetch(`${environment.apiUrls.posts}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),

        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedPostById = await response.json();
        patchState(store, {
          posts: store.posts().map((p) => (p.id === id ? updatedPostById : p)),
        });
      } catch (error) {
        console.error(`Fehler beim Aktualisieren des Posts ${id}:`, error);
        throw error;
      }
    },

    async deletePostById(id: number) {
      patchState(store, { isLoading: true, error: null });
      try {
        const response = await fetch(`${environment.apiUrls.posts}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        patchState(store, {
          posts: store.posts().filter((post) => post.id !== id),
          isLoading: false,
        });
      } catch (error: any) {
        patchState(store, { error: error.message, isLoading: false });
      }
    },
  }))
);
