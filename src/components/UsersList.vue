<template>
  <div>
    <button type="button" @click="getUsers(prevPage)" v-if="prevPage">Prev</button>
    <button type="button" @click="getUsers(nextPage)" v-if="nextPage">Next</button>
    <table>
      <tr v-for="user in usersList" :key="user.id">
        <td><router-link :to="{name:'user_detail',params:{id:user.id}}">{{ user.id }}</router-link></td>
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.ip_address }}</td>
        <td>{{ user.total_clicks }}</td>
        <td>{{ user.total_page_views }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UsersList',
  data() {
    return {
      usersList: [],
      nextPage: '',
      prevPage: ''
    };
  },
  mounted() {
    this.$axios
      .get('http://127.0.0.1:8000/api/v1/users/')
      .then(response => (
        this.usersList = response.data.results,
        this.nextPage = response.data.next,
        this.prevPage = response.data.previous
      ));
  },
  methods: {
    getUsers(nextPage) {
    this.$axios
      .get(nextPage)
      .then(response => (
        this.usersList = response.data.results,
        this.nextPage = response.data.next,
        this.prevPage = response.data.previous
      ));
    }
  }
}
</script>

<style scoped>
body {
  background: red;
}
</style>
