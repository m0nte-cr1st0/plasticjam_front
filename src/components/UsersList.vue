<template>
  <div>
    <button type="button" @click="getUsers(-1)">Prev</button>
    <button type="button" @click="getUsers(+1)">Next</button>
    <input type="number" max="50" v-model="countUsers" placeholder="Count of users">
    <input type="number" max="50" v-model="pageNumber" placeholder="Number of page">
    <button type="button" @click="getUsersInput()">Submit</button>
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
      countUsers: 50,
      pageNumber: 1,
      nexPageNumber: '',
      prevPageNumber: '',
      maxPages: ''
    };
  },
  mounted() {
    this.$axios
      .get('http://127.0.0.1:8000/api/v1/users/', {
        params: {
         'users_count': 50,
         'page': 1
        }
      })
      .then(response => (
        this.usersList = response.data.data,
        this.nexPageNumber = 2,
        this.prevPageNumber = null,
        this.pageNumber = 1,
        this.maxPages = Math.ceil(response.data.count_users / this.countUsers)
      ));
  },
  methods: {
    getUsers(inc) {
        if ( this.pageNumber <= 1 && inc == -1 ) {
          this.pageNumber = 2;
        }
        this.nexPageNumber = +this.pageNumber + inc,
        this.pageNumber = +this.pageNumber + inc
        if (this.pageNumber > this.maxPages) {
          this.pageNumber == this.maxPages
        }
      this.$axios
        .get('http://127.0.0.1:8000/api/v1/users/', {
          params: {
           'users_count': this.countUsers,
           'page': this.nexPageNumber
          }
        })
        .then(response => (
          this.usersList = response.data.data,
          this.maxPages = Math.ceil(response.data.count_users / this.countUsers)
      ));
    },
    getUsersInput() {
      if ( this.countUsers > 50 ) {
        this.countUsers = 50;
      }
      if ( this.pageNumber <= 0 ) {
        this.pageNumber = 1;
      }
      if (this.pageNumber > this.maxPages) {
        this.pageNumber == this.maxPages
      }
      this.$axios
        .get('http://127.0.0.1:8000/api/v1/users/', {
          params: {
           'users_count': this.countUsers,
           'page': this.pageNumber
          }
        })
        .then(response => (
          this.usersList = response.data.data,
          this.maxPages = Math.ceil(response.data.count_users / this.countUsers)
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
