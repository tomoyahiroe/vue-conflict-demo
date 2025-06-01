<!-- src/components/UserList.vue -->
<script setup>
import { ref, computed } from 'vue'
const users= [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]

// 検索ワード用の ref
const search = ref('')

// 検索キーワードに応じて絞り込まれたユーザー一覧を返す computed プロパティ
const filteredUsers = computed(() => {
  const keyword = search.value.toLowerCase()
  return users.filter(u => u.name.toLowerCase().includes(keyword))
})
</script>
<template>
  <div class="user-list">
    <!-- 見出しを変更 -->
    <h2>Searchable User List</h2>

    <!-- 検索ボックスを追加 -->
    <input
      v-model="search"
      type="text"
      placeholder="Search users..."
      style="width: 100%; padding: 4px; margin-bottom: 8px;"
    />

    <ul>
      <!-- users → filteredUsers に差し替え -->
      <li v-for="user in filteredUsers" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
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
