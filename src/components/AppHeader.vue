<template>
    <header class="header">
        <nav class="header__nav">
            <span class="header__logo">WADBook</span>
            <div class="header__links">
                <router-link class="header__link" to="/">Home</router-link>
                <router-link class="header__link" to="/signup">Signup</router-link>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>

<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 5;
    padding: 12px;
}

.header__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    max-width: 1080px;
    margin: 0 auto;
    padding: 8px 8px 8px 16px;
    border-radius: var(--radius-lg);
    background-color: var(--glass-bg);
    border: 1px solid var(--glass-line);
    -webkit-backdrop-filter: var(--glass-blur);
    backdrop-filter: var(--glass-blur);
    box-shadow: var(--glass-shadow);
}

.header__logo {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: var(--color-text-strong);
}

.header__links {
    display: flex;
    gap: 4px;
}

.header__link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 14px;
    border: 1px solid transparent;
    border-radius: var(--radius-pill);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-soft);
    text-decoration: none;
    transition: color 200ms ease-in-out, background-color 200ms ease-in-out;
}

.header__link:hover {
    color: var(--color-accent-hover);
}

.header__link.router-link-exact-active {
    font-weight: 600;
    color: var(--color-accent);
    background-color: var(--color-accent-tint);
    border-color: var(--color-accent-line);
}

@media only screen and (width >= 640px) {
    .header {
        padding: 16px 24px;
    }

    .header__nav {
        padding: 12px 20px;
    }

    .header__logo {
        font-size: 24px;
        cursor: default;
    }

    .header__link {
        padding: 0 18px;
        font-size: 15px;
    }
}
</style>