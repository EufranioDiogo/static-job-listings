const app = new Vue({
  el: '#app',
  data: {
    jobs: []
  },
  methods: {
    fetchAllJobs: function () {
      fetch('./data.json')
      .then((data) => data.json())
      .then((data) => {
        this.jobs = data;
      })
      .catch((err) => {
        this.jobs = []
      })
    }
  }
})

app.fetchAllJobs();