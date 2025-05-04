<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Dynamic Table with DB Binding</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Function</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Status</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Employed</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(author, index) in authors" :key="index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar :img="`/${author.IMG_DIR}`" size="sm" border-radius="lg" class="me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ author.NAME }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ author.EMAIL }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ author.JOB_TITLE }}</p>
                <p class="text-xs text-secondary mb-0">{{ author.SUB_SUBTITLE }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge :color="getStatusColor(author.STATUS)" variant="gradient" size="sm">{{ getStatus(author.STATUS) }}</vsud-badge>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ formatDate(author.EMPLOYED_DATE) }}</span>
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                >Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import axios from 'axios'

export default {
  name: "AuthorsTable",
  components: {
    VsudAvatar,
    VsudBadge,
  },
  data() {
    return {
      authors: [],
    };
  },
  mounted() {
    this.fetchAuthors();
  },
  methods: {
    async fetchAuthors() {
      try {
        const response = await axios.get('/api/authors');
        this.authors = response.data;
      } catch (error) {
        console.error('Failed to load authors:', error);
      }
    },
    getStatus(statusCode) {
    if (statusCode === '0') return 'Online';
    if (statusCode === '1') return 'Offline';
    return 'Unknown';
    },
    getStatusColor(statusCode) {
    if (statusCode === '0') return 'success'; // green
    if (statusCode === '1') return 'danger'; // red
    return 'secondary'; // grey
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
  },
};
</script>