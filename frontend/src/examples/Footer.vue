<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
            class="text-sm text-center copyright text-muted"
            :class="$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            ©
            {{ new Date().getFullYear() }}, Dashboard customized by Seulki Yoo, based on a template 
            <i class="fa fa-heart"></i> by
            <a
              href="https://www.creative-tim.com"
              class="font-weight-bold"
              target="_blank"
              >Creative Tim</a
            >.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
