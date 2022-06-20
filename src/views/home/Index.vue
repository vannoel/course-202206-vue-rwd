<template>
  <module-layout>
    <router-view />
  </module-layout>
</template>

<script>
import { computed, watch, onMounted } from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { ROUTES } from '@/assets/definitions/routes'

export default {
  name: 'HomeIndexView',
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store.state.Auth.user);

    watch(
      () => user.value,
      () => {
        if (!user.value.id) {
          router.push({ name: ROUTES.LOGIN })
        }
      }
    );

    onMounted(() => {
      if (!user.value.id) {
        router.push({ name: ROUTES.LOGIN })
      }
    })

    return {
      router,
      user,
    }
  },
}
</script>