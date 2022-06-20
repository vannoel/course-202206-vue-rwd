<template>
  <div id="course" class="page">
    <a-breadcrumb>
      <a-breadcrumb-item>學生資訊系統</a-breadcrumb-item>
      <a-breadcrumb-item>選課資訊</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CourseView',
  setup() {
    const store = useStore();

    onMounted(() => {
      store.commit('updateLoadingStatus', false);
    })
  }
}
</script>

<style lang="scss">
#course {
  &.page {
    padding: 12px;
  }
}
</style>