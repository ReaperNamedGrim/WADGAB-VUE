<template>
  <article v-if="post" class="post-card">
    <header class="post-card__header">
      <div class="post-card__author-group">
        <img
          src="./images/profile.png"
          :alt="`${post.author} profile`"
          :title="post.author"
          class="post-card__avatar-img"
        />
        <span class="post-card__author">{{ post.author }}</span>
      </div>
      <time class="post-card__date" :datetime="post.time_created">
        {{ formattedDate }}
      </time>
    </header>

    <img
      v-if="imageSrc"
      class="post-card__image"
      :src="imageSrc"
      :alt="post.img_alt || 'Post image'"
      loading="lazy"
    />

    <p v-if="post.post" class="post-card__text">{{ post.post }}</p>

    <footer class="post-card__footer">
      <button
        type="button"
        class="post-card__like-btn"
        :aria-label="`Like post by ${post.author}`"
        @click="likePost"
      >
        <img
          src="./images/thumb.png"
          alt="Like"
          class="post-card__like-icon"
        />
      </button>
      <span class="post-card__likes">{{ post.likes }} likes</span>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    postId: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    post() {
      return this.$store.state.posts.find((item) => item.id === this.postId);
    },
    imageSrc() {
      if (!this.post) return '';
      if (this.post.img_local) {
        const fileName = this.post.img_local.split('/').pop();
        return `./images/${fileName}`;
      }
      return this.post.img_url || '';
    },
    formattedDate() {
      if (!this.post || !this.post.time_created) return '';
      return new Date(this.post.time_created).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  },
  methods: {
    likePost() {
      this.$store.commit('incrementLikes', this.post.id);
    }
  }
};
</script>

<style scoped>
.post-card {
  width: 100%;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-line);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 200ms ease-in-out, border-color 200ms ease-in-out;
}

.post-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent-line);
}

.post-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--glass-line);
}

.post-card__author-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-card__avatar-img {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-pill);
  object-fit: cover;
  border: 1px solid var(--glass-line);
  background-color: var(--glass-bg-strong);
}

.post-card__author {
  font-weight: 600;
  color: var(--color-text-strong);
}

.post-card__date {
  font-size: 14px;
  color: var(--color-text-faint);
}

.post-card__image {
  width: 100%;
  max-height: 460px;
  object-fit: cover;
  object-position: center;
  border-bottom: 1px solid var(--glass-line);
}

.post-card__text {
  padding: 16px 18px 8px;
  font-size: 15px;
  color: var(--color-text-soft);
  word-break: break-word;
}

.post-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px 16px;
}

.post-card__like-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-pill);
  background-color: var(--color-accent-tint);
  border: 1px solid var(--color-accent-line);
  cursor: pointer;
  transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out, transform 150ms ease-in-out;
}

.post-card__like-btn:hover {
  background-color: rgb(94 234 212 / 0.24);
  border-color: var(--color-accent);
}

.post-card__like-btn:active {
  transform: scale(0.95);
}

.post-card__like-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.post-card__likes {
  font-size: 14px;
  color: var(--color-text-muted);
}
</style>