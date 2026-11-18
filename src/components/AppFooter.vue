<template>
    <footer class="footer">
        <div class="footer__inner">
            <p class="footer__copy">&copy; {{ year }} WADBook</p>
            <a class="footer__link" href="https://courses.cs.ut.ee/2026/WAD/fall" target="_blank">
                WAD course information
            </a>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'AppFooter',
        data() {
            return {
                year: new Date().getFullYear(),
            }
    },
}
</script>

<style scoped>
.footer {
    padding: 12px;
}

.footer__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    max-width: 1080px;
    margin: 0 auto;
    padding: 14px;
    border-radius: var(--radius-lg);
    background-color: rgb(255 255 255 / 0.05);
    border: 1px solid var(--glass-line);
    -webkit-backdrop-filter: var(--glass-blur);
    backdrop-filter: var(--glass-blur);
    font-size: 13px;
}

.footer__copy {
    color: var(--color-text-muted);
    cursor: default;
}

.footer__link {
    font-weight: 600;
    color: var(--color-accent);
    text-decoration: none;
}

.footer__link:hover {
    color: var(--color-accent-hover);
}

@media only screen and (width >= 640px) {
    .footer {
        padding: 16px 24px 24px;
    }

    .footer__inner {
        flex-direction: row;
        justify-content: space-between;
        padding: 18px 24px;
        font-size: 14px;
    }
}
</style>