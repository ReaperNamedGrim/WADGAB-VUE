<template>
  <div class="backdrop" aria-hidden="true">
    <span class="backdrop__orb backdrop__orb--teal"></span>
    <span class="backdrop__orb backdrop__orb--violet"></span>
  </div>
  <AppHeader />
  <main class="page">
    <router-view />
  </main>
  <AppFooter />
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.backdrop__orb {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  filter: blur(90px)
}

.backdrop__orb--teal {
  top: 10%;
  left: -100px;
  background-color: var(--color-orb-teal);
  opacity: 0.45;
}

.backdrop__orb--violet {
  top: 50%;
  left: -120px;
  background-color: var(--color-orb-violet);
  opacity: 0.5;
}

.page {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
  padding: 24px 12px;
}

@media only screen and (width >= 640px) {
  .backdrop__orb {
    width: 520px;
    height: 520px;
    filter: blur(110px)
  }

  .page {
    padding: 48px 24px;
  }
}
</style>