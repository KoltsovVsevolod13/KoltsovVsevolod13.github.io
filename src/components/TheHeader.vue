<script setup>
import { ref } from 'vue'

const search = ref('')
</script>

<template>
  <header class="header">
    <div class="left">
      <button class="icon-btn">☰</button>
      <a class="logo" href="#">
        <span class="logo-icon">▶</span>
        <span class="logo-text">Videohosting</span>
      </a>
    </div>

    <div class="center">
      <input
        v-model="search"
        class="search"
        type="text"
        placeholder="Поиск"
      />
      <button class="search-btn">🔍</button>
      <button class="mic-btn">🎤</button>
    </div>

    <div class="right">
      <button class="icon-btn">＋</button>
      <button class="avatar-btn">К</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 56px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.left,
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.center {
  display: flex;
  flex: 0 1 640px;
  align-items: center;
  margin: 0 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 4px;
}

.logo-icon {
  color: var(--red);
  font-size: 20px;
}

.logo-text {
  font-weight: bold;
  font-size: 20px;
  letter-spacing: -1px;
  color: var(--fg);
}

.icon-btn {
  background: transparent;
  border: none;
  color: var(--fg);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
}

.icon-btn:hover {
  background: var(--hover);
}

.search {
  flex: 1;
  padding: 0 16px;
  height: 40px;
  background: var(--bg);
  color: var(--fg);
  border: 1px solid #ccc;
  border-radius: 20px 0 0 20px;
  outline: none;
  font-size: 14px;
}

.search:focus {
  border-color: var(--accent);
}

.search-btn {
  height: 40px;
  width: 64px;
  background: var(--bg-2);
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 20px 20px 0;
  color: var(--fg);
  cursor: pointer;
  font-size: 16px;
}

.search-btn:hover {
  background: var(--hover);
}

.mic-btn {
  width: 40px;
  height: 40px;
  margin-left: 8px;
  background: var(--bg-2);
  border: none;
  border-radius: 50%;
  color: var(--fg);
  cursor: pointer;
  font-size: 16px;
}

.mic-btn:hover {
  background: var(--hover);
}

.avatar-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ff5722;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}
</style>
