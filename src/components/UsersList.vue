<template>
  <div>
    <b-form class="text-center">
      <b-row class="my-1">
        <b-form-group
          id="input-group-1"
          label="Users count:"
          label-for="users-count"
          class="col-md-4"
        >
          <b-form-input
            id="users-count"
            type="number"
            max="50"
            v-model="countUsers"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Number of the page:"
          label-for="page-number"
          class="col-md-4"
        >
          <b-form-input
            id="page-number"
            type="number"
            :max="maxPages"
            v-model="pageNumber"
          ></b-form-input>
        </b-form-group>
        <div class="navigation-block">
          <b-button-toolbar key-nav aria-label="Toolbar with button groups">
            <b-button-group class="mx-2" @click="getUsers(-1)">
              <b-button>&lsaquo;</b-button>
            </b-button-group>
          </b-button-toolbar>
          <b-col class="button" @click="getUsersInput()"><b-button>Submit</b-button></b-col>
          <b-button-toolbar key-nav aria-label="Toolbar with button groups">
            <b-button-group class="mx-2" @click="getUsers(+1)">
              <b-button>&rsaquo;</b-button>
            </b-button-group>
          </b-button-toolbar>

        </div>
      </b-row>
    </b-form>
    <b-table-simple hover small caption-top responsive class="text-center">
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
  created () {
    document.title = "PlasticJam - Users list";
  },
  mounted() {
    this.$axios
      .get('/', {
        params: {
         'users_count': 50,
         'page': 1
        }
      })
      .then(response => (
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
        .get('/', {
          params: {
           'users_count': this.countUsers,
           'page': this.nexPageNumber
          }
        })
        .then(response => (
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
        .get('/', {
          params: {
           'users_count': this.countUsers,
           'page': this.pageNumber
          }
        })
        .then(response => (
          this.usersList = response.data.results,
          this.maxPages = Math.ceil(response.data.count / this.countUsers)
      ));
    }
  }
}
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
}
.navigation-block {
  display: flex;
  align-items: center;
  margin: 0 auto;
}
</style>
