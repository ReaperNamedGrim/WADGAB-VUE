<template>
  <section class="home">
    <div class="home__feed">
      <PostCard
        v-for="post in sortedPosts"
        :key="post.id"
        :post-id="post.id"
      />

      <button
        type="button"
        class="home__reset-btn"
        @click="resetLikes"
      >
        Reset likes
      </button>
    </div>
  </section>
</template>

<script>
import PostCard from '../components/PostCard.vue';

export default {
  name: 'HomeView',
  components: {
    PostCard
  },
  computed: {
    sortedPosts() {
      return [...this.$store.state.posts].sort(
        (a, b) => new Date(b.time_created) - new Date(a.time_created)
      );
    }
  },
  methods: {
    resetLikes() {
      this.$store.commit('resetAllLikes');
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
  width: 100%;
}

.home__rail {
  display: none;
}

.home__feed {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 680px;
}

.home__reset-btn {
  margin-top: 8px;
  padding: 10px 22px;
  border: none;
  border-radius: var(--radius-pill);
  background-color: var(--color-accent);
  color: var(--color-accent-ink);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  box-shadow: var(--glass-shadow);
  transition: background-color 200ms ease-in-out, transform 150ms ease-in-out;
}

.home__reset-btn:hover {
  background-color: var(--color-accent-hover);
}

.home__reset-btn:active {
  transform: scale(0.98);
}

@media only screen and (width >= 900px) {
  .home__rail {
    display: block;
    flex: 0 0 150px;
    min-height: 70vh;
    border-radius: var(--radius-xl);
    background-color: var(--glass-bg);
    border: 1px solid var(--glass-line);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
  }
}
</style>