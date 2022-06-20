<template>
  <div id="profile" class="page">
    <a-breadcrumb>
      <a-breadcrumb-item>學生資訊系統</a-breadcrumb-item>
      <a-breadcrumb-item>工讀時數紀錄</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ParttimeView',
  setup() {
    const store = useStore();

    onMounted(() => {
      store.commit('updateLoadingStatus', false);
    })
  }
}
</script>