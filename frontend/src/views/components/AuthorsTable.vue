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
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(author, index) in authors" :key="author.ID">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar :img="`/${author.IMG_DIR}`" size="sm" border-radius="lg" class="me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <!-- 이름과 이메일을 수정할 수 있는 필드로 변경 -->
                    <h6 class="mb-0 text-sm">
                      <input v-if="author.isEditing" v-model="author.NAME" class="form-control form-control-sm" />
                      <span v-else>{{ author.NAME }}</span>
                    </h6>
                    <p class="text-xs text-secondary mb-0">
                      <input v-if="author.isEditing" v-model="author.EMAIL" class="form-control form-control-sm" />
                      <span v-else>{{ author.EMAIL }}</span>
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">
                  <input v-if="author.isEditing" v-model="author.JOB_TITLE" class="form-control form-control-sm" />
                  <span v-else>{{ author.JOB_TITLE }}</span>
                </p>
                <p class="text-xs text-secondary mb-0">{{ author.SUB_SUBTITLE }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <!-- 상태도 수정 가능하도록 변경 -->
                <vsud-badge :color="getStatusColor(author.STATUS)" variant="gradient" size="sm">
                  <select v-if="author.isEditing" v-model="author.STATUS" class="form-control form-control-sm">
                    <option value="0">Online</option>
                    <option value="1">Offline</option>
                  </select>
                  <span v-else>{{ getStatus(author.STATUS) }}</span>
                </vsud-badge>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ formatDate(author.EMPLOYED_DATE) }}</span>
              </td>
              <td class="align-middle">
                <!-- Edit 버튼을 누르면 수정 모드로 전환 -->
                <button v-if="!author.isEditing" @click="editAuthor(author)" class="btn btn-sm btn-primary">Edit</button>
                <!-- 수정 후 저장 버튼 -->
                <button v-if="author.isEditing" @click="saveAuthor(author)" class="btn btn-sm btn-success">Save</button>
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
        this.authors = response.data.map(author => ({ ...author, isEditing: false }));  // isEditing 필드 추가
      } catch (error) {
        console.error('Failed to load authors:', error);
      }
    },
    editAuthor(author) {
      author.isEditing = true;  // Edit 버튼 클릭 시 수정 모드로 전환
    },
    async saveAuthor(author) {
      try {
        const response = await axios.put(`/api/authors/${author.ID}`, {
          NAME: author.NAME,
          EMAIL: author.EMAIL,
          JOB_TITLE: author.JOB_TITLE,
          STATUS: author.STATUS,
        });
        author.isEditing = false;  // 저장 후 수정 모드 종료
        console.log('Author updated:', response.data);
      } catch (error) {
        console.error('Failed to update author:', error);
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
