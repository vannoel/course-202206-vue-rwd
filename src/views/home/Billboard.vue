<template>
  <div id="billboard" class="page">
    <a-breadcrumb>
      <a-breadcrumb-item>學生資訊系統</a-breadcrumb-item>
      <a-breadcrumb-item>學校公告</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>


<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'BillBoardView',
  setup() {
    const store = useStore();

    onMounted(() => {
      store.commit('updateLoadingStatus', false);
    })
  }
}
</script>

<style lang="scss">
#billboard {
  &.page {
    padding: 12px;
  }
}
</style>