<template>
  <form class="signup-card" @submit.prevent="handleSubmit">
    <div class="signup-card__intro">
      <h1 class="signup-card__title">Create your account</h1>
      <p class="signup-card__text">Join WADBook to post and like updates.</p>
    </div>

    <FormField
      id="email"
      label="Email"
      type="email"
      placeholder="email"
      v-model="email"
    />

    <FormField
      id="password"
      label="Password"
      type="password"
      placeholder="password"
      v-model="password"
    />

    <div
      v-if="passwordErrors.length"
      id="password-error"
      class="signup-card__error"
    >
      <p class="signup-card__error-title">The password is not valid</p>
      <ul class="signup-card__error-list">
        <li
          v-for="err in passwordErrors"
          :key="err"
          class="signup-card__error-item"
        >
          {{ err }}
        </li>
      </ul>
    </div>

    <button class="signup-card__button" type="submit">Signup</button>
  </form>
</template>

<script>
import FormField from "./FormField.vue";

const UPPERCASE_RE = /\p{Lu}/u;
const LOWERCASE_RE = /\p{Ll}/u;
const NUMBER_RE = /\p{N}/u;

function countMatches(str, regex) {
  let count = 0;
  for (const char of str) {
    if (regex.test(char)) count++;
  }
  return count;
}

function firstMatches(str, regex) {
  const firstChar = [...str][0];
  return Boolean(firstChar && regex.test(firstChar));
}

export default {
  name: "SignupCard",
  components: { FormField },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    hasPasswordErrors() {
      return !this.password || this.passwordErrors.length > 0;
    },
    passwordErrors: function () {
      if (!this.password) return [];
      const errors = [];

      if (this.password.length < 8) {
        errors.push("Password should be at least 8 characters long");
      }
      if (this.password.length >= 15) {
        errors.push("Password should be less than 15 characters long");
      }
      if (countMatches(this.password, UPPERCASE_RE) < 1) {
        errors.push("Password should have at least one uppercase character");
      }
      if (countMatches(this.password, LOWERCASE_RE) < 2) {
        errors.push("Password should have at least two lowercase characters");
      }
      if (countMatches(this.password, NUMBER_RE) < 1) {
        errors.push("Password should have at least one numeric character");
      }
      if (!firstMatches(this.password, UPPERCASE_RE)) {
        errors.push("Password should start with an uppercase character");
      }
      if (!this.password.includes("_")) {
        errors.push("Password should have at least one '_' character");
      }
      return errors;
    },
  },
  methods: {
    handleSubmit() {
      if (!this.email.trim() || this.hasPasswordErrors) {
        return;
      }

      // this.$store.commit('setUserEmail', this.email.trim());
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.signup-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 440px;
  padding: 24px 20px;
  border-radius: var(--radius-xl);
  background-color: var(--glass-bg-strong);
  border: 1px solid var(--glass-line);
  -webkit-backdrop-filter: blur(22px) saturate(170%);
  backdrop-filter: blur(22px) saturate(170%);
  box-shadow: 0 12px 48px rgb(0 0 0 / 0.4);
}

.signup-card__intro {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.signup-card__title {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.signup-card__text {
  font-size: 14px;
  color: var(--color-text-muted);
}

.signup-card__button {
  min-height: 48px;
  border: none;
  border-radius: var(--radius-pill);
  background-color: var(--color-accent);
  box-shadow: 0 6px 20px rgb(94 234 212 / 0.3);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-accent-ink);
  cursor: pointer;
  transition: background-color 200ms ease-in-out;
}

.signup-card__button:hover {
  background-color: var(--color-accent-hover);
}

.signup-card__error {
  color: var(--color-error-text);
  font-size: 14px;
}

.signup-card__error-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.signup-card__error-list {
  margin: 0;
  padding-left: 18px;
}

@media only screen and (width >= 640px) {
  .signup-card {
    gap: 20px;
    padding: 36px;
    border-radius: 28px;
  }

  .signup-card__title {
    font-size: 30px;
  }

  .signup-card__text {
    font-size: 15px;
  }
}
</style>
