<template>
  <div>
    <div>{{ user.first_name }}</div>
    <div>{{ user.last_name }}</div>
    <div>{{ user.email }}</div>
    <div>{{ user.gender }}</div>
    <div>{{ user.ip_address }}</div>
    <table>
      <tr v-for="stat in user.statistics" :key="stat.id">
        <td>{{ stat.date }}</td>
        <td>{{ stat.clicks }}</td>
        <td>{{ stat.page_views }}</td>

      </tr>
    </table>
  </div>
</template>

<script>
export default {
    name: 'UserDetail',
    data() {
        return {
          user: ''
        }
    },
    mounted() {
        let id = this.$route.params.id;
        this.$axios
            .get('http://127.0.0.1:8000/api/v1/users/'+id+'/')
            .then(response => {
              this.user=response.data
        })
    },
    methods: {

    }
};
</script>

<style scoped>

</style>
