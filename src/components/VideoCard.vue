<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <article class="card">
    <h3 class="title">{{ title }}</h3>
  </article>
</template>

<style scoped>
.card {
  padding: 24px 16px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  min-height: 140px;
  display: flex;
  align-items: center;
}

.card:hover {
  background: var(--hover);
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--fg);
  line-height: 1.4;
}
</style>
