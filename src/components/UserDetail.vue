<template>
  <div>
    <div>
        From: <input type="date" id="start" name="trip-start"
           v-model="start_date">
    </div>
    <div>
        To: <input type="date" id="end" name="trip-end"
           v-model="end_date">
    </div>
    <button type="button" @click="getStatistics()">Get statistics</button>
    <div v-for="user in data.user_data" :key="user.id">
        <p>{{ user }}</p>
    </div>
    <table>

    </table>
    <b-table-simple sticky-header hover small caption-top responsive class="text-center">
      <b-thead head-variant="dark">
          <b-tr>
            <b-th>Date</b-th>
            <b-th>Clicks</b-th>
            <b-th>Page views</b-th>
          </b-tr>
      </b-thead>
      <tr v-for="stat in data.statistics" :key="stat.id">
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
          data: {},
          start_date: '',
          end_date: ''
        }
    },
    mounted() {
        let id = this.$route.params.id;
        this.$axios
            .get('http://127.0.0.1:8000/api/v1/users/'+id+'/')
            .then(response => {
              console.log(response.data),
              this.data=response.data,
              this.start_date=response.data.dates_rang[0],
              this.end_date=response.data.dates_rang[1]
        })
    },
    methods: {
        getStatistics() {
          let id = this.$route.params.id;
          this.$axios
            .get('http://127.0.0.1:8000/api/v1/users/'+id+'/', {
              params: {
               'start_date': this.start_date,
               'end_date': this.end_date
              }
            })
            .then(response => (
              this.data=response.data
            ));
        }
    }
};
</script>

<style scoped>

</style>
