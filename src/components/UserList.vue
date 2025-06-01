<!-- src/components/UserList.vue -->
<script setup>
const users= [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]
</script>
<template>
  <div class="user-list">
    <h2>User List</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
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
