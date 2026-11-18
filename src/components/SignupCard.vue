<template>
    <form class="signup-card" @submit.prevent>
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

        <button class="signup-card__button" type="submit">Signup</button>
    </form>
</template>

<script>
import FormField from './FormField.vue';

export default {
    name: 'SignupCard',
    components: { FormField },
    data() {
        return {
            email: '',
            password: ''
        }
    }
}
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