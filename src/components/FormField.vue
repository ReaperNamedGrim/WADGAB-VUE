<template>
    <div class="form-field">
        <label class="form-field__label" :for="id">{{ label }}</label>
        <input
            class="form-field__input"
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            required
        />
    </div>
</template>

<script>
export default {
    name: 'FormField',
    props: {
        id: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, default: 'text' },
        placeholder: { type: String, default: '' },
        modelValue: { type: String, default: '' }
    },
    emits: ['update:modelValue']
}
</script>

<style scoped>
.form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-field__label {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-soft);
}

.form-field__input {
    height: 48px;
    padding: 0 14px;
    border-radius: var(--radius-md);
    background-color: rgb(255 255 255 / 0.06);
    border: 1px solid rgb(255 255 255 / 0.18);
    font-size: 16px;
    color: var(--color-text-strong);
    transition: border-color 200ms ease-in-out, box-shadow 200ms ease-in-out;
}

.form-field__input::placeholder {
    color: var(--color-text-faint);
}

.form-field__input:focus {
    outline: none;
    border-color: var(--color-accent-line);
    box-shadow: 0 0 0 3px var(--color-accent-tint);
}
</style>