<template>
  <div id="app">
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
