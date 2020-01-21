<template>
  <div class="container-fluid">
  <line-chart
    :chart-data="chartdata"
    :hight="50"
    :options="options"
    v-if="show"
  ></line-chart>
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
  </div>
</template>

<script>
import LineChart from './LineChart.js'
export default {
    name: 'UserDetail',
    components: {
      LineChart
    },
    data() {
        return {
          user: '',
          start_date: '',
          end_date: '',
          stat_data: '',
          chartdata: {
            labels: [],
            datasets: [
              {
                label: 'Clicks',
                backgroundColor: '#f87979',
                data: []
              },
              {
                label: 'Page wiews',
                backgroundColor: '#f879',
                data: []
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true
          },
          show: ''
        }
    },
    created () {
      document.title = 'Detail statistic page';
      this.show = false;
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
              this.stat_data = response.data;
              this.user = response.data.results[0].user;
              this.start_date = response.data.results.min_date;
              this.end_date = response.data.results.max_date;
              for (let res of response.data.results) {
                  this.chartdata.datasets[0].data.push(res.clicks);
                  this.chartdata.datasets[1].data.push(res.page_views);
                  this.chartdata.labels.push(res.date);
              }
              this.show = true;
        })
    },
    methods: {
      getStatistics() {
          this.show = false;
          let id = this.$route.params.id;
          this.$axios.get(id+'/', {
              params: {
                  'user_pk': id,
                  'start_date': this.start_date,
                  'end_date': this.end_date
              }
          }).then(response => {
              this.stat_data = response.data;
              this.chartdata.datasets[0].data = [];
              this.chartdata.datasets[1].data = [];
              this.chartdata.labels = [];
              for (let res of response.data.results) {
                  this.chartdata.datasets[0].data.push(res.clicks);
                  this.chartdata.datasets[1].data.push(res.page_views);
                  this.chartdata.labels.push(res.date);
              }
              this.show = true
          });
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
