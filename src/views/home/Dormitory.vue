<template>
  <div id="dormitory" class="page">
    <a-breadcrumb>
      <a-breadcrumb-item>學生資訊系統</a-breadcrumb-item>
      <a-breadcrumb-item>宿舍資訊</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'DormitoryView',
  setup() {
    const store = useStore();

    onMounted(() => {
      store.commit('updateLoadingStatus', false);
    })
  }
}
</script>

<style lang="scss">
#dormitory {
  &.page {
    padding: 12px;
  }
}
</style>