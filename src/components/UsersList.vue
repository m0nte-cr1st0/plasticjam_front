<template>
  <div>
    <b-pagination
      v-model="pageNumber"
      :total-rows="rows"
      :per-page="perPage"
    ></b-pagination>
    <button type="button" @click="getUsers(-1)">Prev</button>
    <button type="button" @click="getUsers(+1)">Next</button>
    <b-row class="my-1" v-for="type in types" :key="type">
      <b-col sm="4">
        <b-form-input :id="`type-${number}`" :type="number"></b-form-input>
      </b-col>
    </b-row>
    <input type="number" max="50" v-model="countUsers" placeholder="Count of users">
    <input type="number" max="50" v-model="pageNumber" placeholder="Number of page">
    <button type="button" @click="getUsersInput()">Submit</button>
    <b-table-simple sticky-header="768px" hover small caption-top responsive class="text-center">
      <caption>Users list:</caption>
      <b-thead head-variant="dark">
          <b-tr>
            <b-th>Id</b-th>
            <b-th>First name</b-th>
            <b-th>Last name</b-th>
            <b-th>Email</b-th>
            <b-th>Gender</b-th>
            <b-th>Ip address</b-th>
            <b-th>Total clicks</b-th>
            <b-th>Total page views</b-th>
          </b-tr>
      </b-thead>
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
    </b-table-simple>
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
        console.log(response.data),
        this.usersList = response.data.results,
        this.nexPageNumber = 2,
        this.prevPageNumber = null,
        this.pageNumber = 1,
        this.maxPages = Math.ceil(response.data.count / this.countUsers)
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
            console.log(response),
          this.usersList = response.data.results,
          this.maxPages = Math.ceil(response.data.count / this.countUsers)
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
        console.log(response),
          this.usersList = response.data.results,
          this.maxPages = Math.ceil(response.data.count / this.countUsers)
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
