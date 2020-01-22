<template>
  <div class="container-fluid">
  <b-row>
    <b-form-group class="col-md-9">
      <div class="col-md-3">
          <div>From:</div><input type="date" id="start" name="trip-start"
             v-model="start_date">
      </div>
      <div class="col-md-3">
          <div>To:</div><input type="date" id="end" name="trip-end"
             v-model="end_date">
      </div>
      <b-col class="col-md-3 button" @click="getStatistics()"><b-button>Get statistics</b-button></b-col>
    </b-form-group>
    <b-form-group class="to-home">
      <router-link :to="{name:'users-list'}">Home page</router-link>
    </b-form-group>
  </b-row>
  <line-chart
    :chart-data="chartdata"
    :height=400
    :options="options"
    v-if="show"
  ></line-chart>

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
          chartdata: {
            labels: [],
            datasets: [
              {
                label: 'Clicks',
                backgroundColor: '#5DBCD2',
                data: []
              },
              {
                label: 'Page wiews',
                backgroundColor: '#f879',
                hoverBackgroundColor: '#fff',
                data: []
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 3,
            title: {
                display: true,
                text: 'Chart'
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false,
                  color: "black"
                },
                scaleLabel: {
                  display: true,
                  labelString: "Date",
                  fontColor: "red"
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "black",
                  borderDash: [2, 5],
                },
                scaleLabel: {
                  display: true,
                  labelString: "Count",
                  fontColor: "green"
                }
              }]
            }
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
              var stat_data = response.data.statistics;
              this.start_date = response.data.min_date;
              this.end_date = response.data.max_date;
              for (let res of stat_data) {
                  this.chartdata.datasets[0].data.push(res.clicks);
                  this.chartdata.datasets[1].data.push(res.page_views);
                  this.chartdata.labels.push(res.date);
              }
              this.options.title.text = response.data.user.first_name + ' ' +
                response.data.user.last_name + "'s statistic"
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
              var stat_data = response.data.statistics;
              this.chartdata.datasets[0].data = [];
              this.chartdata.datasets[1].data = [];
              this.chartdata.labels = [];
              for (let res of stat_data) {
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
