import { createStore } from 'vuex';
import postsData from '../data/posts.json';

export default createStore({
  state: {
    posts: (postsData.posts || []).map((post, index) => ({
      id: post.id ?? index + 1,
      likes: post.likes ?? 0,
      ...post
    }))
  },
  mutations: {
    incrementLikes(state, postId) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.likes += 1;
      }
    },
    resetAllLikes(state) {
      state.posts.forEach((post) => {
        post.likes = 0;
      });
    }
  }
});