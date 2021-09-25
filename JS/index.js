const app = new Vue({
  el: '#app',
  data: {
    jobs: [],
    jobsListed: [],
    tagsToSearch: []
  },
  methods: {
    fetchAllJobs: function () {
      fetch('./data.json')
      .then((data) => data.json())
      .then((data) => {
        this.jobs = data;
        this.jobsListed = data;
      })
      .catch((err) => {
        this.jobs = []
      })
    },
    deleteAllSearchFilterTags: function () {
      this.tagsToSearch = [];
      this.fetchAllJobs();
    },
    addTagSearchFilter: function (tag) {
      if (!this.tagsToSearch.includes(tag)) {
        this.tagsToSearch.push(tag);
        this.filterJobs();
      }
    },
    deleteTagToTheSearchFilter: function (tag) {
      this.tagsToSearch = this.tagsToSearch.filter(tagText => tag !== tagText)
      this.fetchAllJobs();
    },
    filterJobs: function() {
      let tempJobs = [];

      for (const job of this.jobs) {
        if (this.isJobInFilterRequisites([job.role, job.level, ...job.tools, ...job.languages])) {
          tempJobs.push(job);
        }
      }
      this.jobsListed = tempJobs;
    },
    isJobInFilterRequisites: function (jobNecessities) {
      const tagsThatJobHas = this.tagsToSearch.filter(tag => jobNecessities.includes(tag));

      return tagsThatJobHas.length == this.tagsToSearch.length;
    }
  }
})

app.fetchAllJobs();