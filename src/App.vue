<template>
  <router-view />
  <module-loading-overlay :loading="loadingStatus"/>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from 'vuex';

export default {
  name: 'app',
  setup() {
    const store = useStore();
    
    const loadingStatus = computed(()=> store.state.loadingStatus);
    return {
      loadingStatus,
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
}
</style>
