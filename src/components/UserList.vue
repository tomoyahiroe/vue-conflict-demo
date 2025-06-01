<!-- src/components/UserList.vue -->
<script setup>
import { ref } from "vue";
const users = ref([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
]);

// Load More ボタンをクリックしたときに、新しいユーザーを追加する関数
function loadMore() {
  const nextId = users.value.length + 1;
  users.value.push({ id: nextId, name: `NewUser${nextId}` });
}
</script>
<template>
  <div class="user-list">
    <h2>User List</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    <!-- Load More ボタンを追加 -->
    <button @click="loadMore" style="margin-top: 12px">Load More Users</button>
  </div>
</template>
<style scoped>
.user-list {
  max-width: 400px;
  margin: 0 auto;
}
.user-list h2 {
  color: #35495e;
}
.user-list ul {
  list-style-type: none;
  padding: 0;
}
.user-list li {
  padding: 4px 0;
  border-bottom: 1px solid #ddd;
}
</style>
