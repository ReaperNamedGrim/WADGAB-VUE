# Vue 3 + Vuex cheat sheet for WADBook (React/Redux mapping)

## 1. Big picture

| This project | React equivalent |
|---|---|
| `.vue` file (Single File Component) | One component file, split in 3 blocks |
| `<template>` | JSX / return value |
| `<script>` with `export default {...}` | Class-style component options object |
| `<style scoped>` | CSS modules (styles only apply to this component) |
| `main.js` | `index.js` with `createRoot().render()` |
| `vue-router` | `react-router` |
| Vuex store | Redux store |

Startup flow: `main.js` creates the app from `App.vue`, plugs in the store and router (`.use(store).use(router)`), mounts to `#app`.

## 2. Template syntax (the `:` and `v-` stuff)

| Syntax | Meaning | React equivalent |
|---|---|---|
| `{{ post.author }}` | Print a value as text | `{post.author}` |
| `:src="..."` | Short for `v-bind:src`. The value is a JS expression, not a string | `src={...}` |
| `src="..."` (no colon) | Plain static string | `src="..."` |
| `@click="likePost"` | Short for `v-on:click`. Event listener | `onClick={likePost}` |
| `@submit.prevent="handleSubmit"` | `.prevent` = call `preventDefault()` for you | `e.preventDefault()` |
| `v-if="post"` | Render only if truthy | `{post && <X/>}` |
| `v-for="post in sortedPosts" :key="post.id"` | Loop, `:key` required | `.map()` with `key` |
| `v-model="email"` | Two-way binding input <-> data | `value` + `onChange` |

Examples in the repo:
- `PostCard.vue`: `:src="`${baseUrl}images/profile.png`"` (backtick template string inside a binding), `v-if="imageSrc"`, `@click="likePost"`.
- `HomeView.vue`: `v-for` over `sortedPosts`.
- `SignupCard.vue`: `v-model`, `@submit.prevent`, `v-if` on the error box, `v-for` on the error list.

## 3. Component script options

```js
export default {
  name, components, props, emits, data, computed, methods
}
```

- **`components`**: components you use in the template (like imports you must register). `App.vue` registers `AppHeader`, `AppFooter`.
- **`data()`**: local state, returned as an object (React `useState`). Example: `email`, `password` in `SignupCard`. In methods you read it as `this.email`.
- **`computed`**: values derived from other values, cached, recalculated only when dependencies change (React `useMemo`, but automatic). Used a lot here:
  - `sortedPosts` (HomeView), `post`, `imageSrc`, `formattedDate` (PostCard), `passwordErrors` (SignupCard).
  - You use them like a property (`this.post`), not a function call.
- **`methods`**: functions you call from events (`likePost`, `resetLikes`, `handleSubmit`).
- **`this`**: refers to the component, gives access to data, computed, methods, `$store`, `$router`. This is why methods are not arrow functions.

## 4. Props and events (parent <-> child)

- **Props down**: `PostCard` gets `:post-id="post.id"` from HomeView. In the child it is declared in `props` with a type and `required`. Note `post-id` (kebab-case in template) becomes `postId` (camelCase in JS). Same idea as React props.
- **Events up**: child calls `$emit('eventName', value)`, parent listens with `@eventName`. Declared in `emits`.
- **`v-model` on a custom component** (the trickiest part, `FormField.vue`):
  - `v-model="email"` on `<FormField>` is shorthand for `:modelValue="email"` + `@update:modelValue="email = $event"`.
  - So `FormField` takes a prop `modelValue` and emits `update:modelValue` on every keystroke.
  - In React terms: a controlled input where parent passes `value` and `onChange`. This is the pattern to be able to explain.
- `$event.target.value` inside `@input` is the same as `e.target.value` in React.

## 5. Vuex (vs Redux)

File: `src/store/index.js`.

| Vuex | Redux | In this project |
|---|---|---|
| `state` | state | `posts` array, built from `posts.json` |
| `mutations` | reducers | `incrementLikes`, `resetAllLikes` |
| `actions` | thunks | none used (no async work) |
| `getters` | selectors | none used (the components do it via `computed`) |
| `store.commit('name', payload)` | `dispatch({type, payload})` | `this.$store.commit('incrementLikes', id)` |
| `this.$store.state.posts` | `useSelector` | `PostCard.post`, `HomeView.sortedPosts` |

Key difference to remember: **mutations mutate state directly** (`post.likes += 1`). Vue tracks the change and re-renders. No spreading/copying like Redux. Mutations must be synchronous.

Store init detail: it maps the JSON posts and gives defaults: `id: post.id ?? index + 1`, `likes: post.likes ?? 0`. `??` means "use the right side only if left is null/undefined". Then `...post` spreads the original fields on top.

Data flow of a like click:
1. Click -> `@click="likePost"` in `PostCard`
2. `likePost()` -> `this.$store.commit('incrementLikes', this.post.id)`
3. Mutation finds the post and does `likes += 1`
4. `computed post` depends on the store -> re-renders `{{ post.likes }} likes`

Design point: `PostCard` receives only the **id**, then looks up the post in the store itself. So the store is the single source of truth.

## 6. Router

File: `src/router/index.js`.

- `routes` array maps path -> view component (`/` -> HomeView, `/signup` -> SignupView).
- `createWebHashHistory()`: URLs look like `/#/signup`. Works on GitHub Pages without server config.
- `<router-view />` in `App.vue` = where the current page renders (React Router `<Outlet/>`).
- `<router-link to="/signup">` = `<Link>`. Active link gets the class `router-link-exact-active`, which `AppHeader` styles.
- `this.$router.push('/')` = programmatic navigation (`navigate('/')`), used after successful signup.

## 7. Specific features to know for the presentation

**Signup validation (`SignupCard.vue`)**
- `passwordErrors` is a computed property returning an array of error strings, rendered with `v-for`. It updates live as the user types because `v-model` updates `password`.
- Rules: length 8-14, 1+ uppercase, 2+ lowercase, 1+ number, starts uppercase, contains `_`.
- Regex uses Unicode classes (`\p{Lu}` uppercase letter, `\p{Ll}` lowercase, `\p{N}` number, flag `u`), so non-English letters count.
- `hasPasswordErrors` is another computed that builds on `passwordErrors` (computed can use computed).
- `handleSubmit` blocks submit if email is empty or password invalid, else redirects home.
- `@submit.prevent` stops the browser's page reload.

**Home feed (`HomeView.vue`)**
- `sortedPosts` copies the array (`[...]`) before `.sort()` so the store state is not mutated by sorting. Newest first.
- "Reset likes" commits `resetAllLikes`.

**PostCard**
- `baseUrl` uses `process.env.BASE_URL` so image paths work both locally (`/`) and on GitHub Pages (`/WADGAB-VUE/`, set in `vue.config.js` `publicPath`).
- `imageSrc`: prefers local image, falls back to external URL.
- `formattedDate`: `toLocaleDateString('en-US', ...)`.
- `v-if="post"` guards against a missing post.

**Styling**
- `<style scoped>`: Vue adds a unique attribute so CSS only affects that component. `App.vue` has one non-scoped block (for `#app`) and one scoped.
- CSS variables (`var(--color-accent)`) live in `styles/variables.css`.
- BEM class naming (`post-card__header`, `--teal`).

**Build/deploy**
- Vue CLI (webpack): `npm run serve` (dev), `npm run build` (output in `dist/`).
- `.github/workflows/deploy.yml` deploys to GitHub Pages; `vue.config.js` sets the base path for it.

## 8. Likely questions and short answers

- *Why Vuex instead of local state?* Likes are shared state: updated in PostCard, reset in HomeView.
- *Why computed instead of method?* Cached, and recalculates only when dependencies change.
- *Why `:key` in `v-for`?* Lets Vue track items efficiently when the list changes (same as React keys).
- *Why a mutation, not changing state in the component?* Vuex rule: all state changes go through mutations so they are traceable.
- *How does `FormField` work with `v-model`?* Prop `modelValue` in, `update:modelValue` event out.
- *Why `.prevent`?* Stops default form submit/page reload.
- *What does `scoped` do?* Limits CSS to the component.

## 9. Things in the code you might get asked about

- `SignupCard.vue`: the line `// this.$store.commit('setUserEmail', ...)` is commented out, so no email is stored. Be ready to say it is a planned or unused feature.
- `HomeView.vue`: `.home__rail` CSS exists but no element uses it (leftover).
- This project uses the **Options API**. Vue 3 also has the **Composition API** (`<script setup>`, `ref`, `computed()`), which is closer to React hooks. If asked, say you used Options API because it was in the course material (confirm this for your course).
