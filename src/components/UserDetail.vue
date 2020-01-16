<template>
  <div class="container-fluid">
    <b-row>
      <b-form-group class="col-md-9">
        <div class="col-md-3">
            From: <input type="date" id="start" name="trip-start"
               v-model="start_date">
        </div>
        <div class="col-md-3">
            To: <input type="date" id="end" name="trip-end"
               v-model="end_date">
        </div>
        <b-col class="col-md-3 button" @click="getStatistics()"><b-button>Get statistics</b-button></b-col>
      </b-form-group>
      <b-form-group class="to-home">
        <router-link :to="{name:'users-list'}">Home page</router-link>
      </b-form-group>
    </b-row>

    <b-table-simple hover small caption-top responsive class="text-center">
      <caption>{{ user.first_name }} {{ user.last_name }} statistic:</caption>
      <b-thead head-variant="dark">
          <b-tr>
            <b-th>Date</b-th>
            <b-th>Clicks</b-th>
            <b-th>Page views</b-th>
          </b-tr>
      </b-thead>
      <tr v-for="stat in data.results" :key="stat.id">
        <td>{{ stat.date }}</td>
        <td>{{ stat.clicks }}</td>
        <td>{{ stat.page_views }}</td>
      </tr>
    </b-table-simple>
  </div>
</template>

<script>
export default {
    name: 'UserDetail',
    data() {
        return {
          user: '',
          data: {},
          start_date: '',
          end_date: ''
        }
    },
    created () {
      document.title = 'Detail statistic page';
    },
    mounted() {
        let id = this.$route.params.id;
        this.$axios
            .get(id+'/', {
              params: {
               'user_pk': id
              }
            })
            .then(response => {
              this.data = response.data,
              this.user = response.data.results[0].user,
              this.start_date = response.data.results.min_date,
              this.end_date = response.data.results.max_date
        })
    },
    methods: {
        getStatistics() {
          let id = this.$route.params.id;
          this.$axios
            .get(id+'/', {
              params: {
               'user_pk': id,
               'start_date': this.start_date,
               'end_date': this.end_date
              }
            })
            .then(response => (
              this.data = response.data
            ));
        }
    }
};
</script>

<style scoped>
.col-md-3 {
  margin: 10px auto
}
.to-home {
  margin: auto
}
</style>
