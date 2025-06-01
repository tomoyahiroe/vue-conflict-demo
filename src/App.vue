<template>
  <div id="app">
    <h1>Team Project: User Management</h1>
    <UserList />   <!-- ここがメインの共同開発対象 -->
  </div>
</template>

<script>
import UserList from './components/UserList.vue';

export default {
  name: 'App',
  components: {
    UserList,
  },
};
</script>
