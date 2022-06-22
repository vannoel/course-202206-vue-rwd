<template>
  <div id="login">
    <a-card class="login_card" title="學生資訊系統">
      <label>帳號</label>
      <input v-model="formState.username" placeholder="請輸入帳號"/>
      <label>帳號</label>
      <input v-model="formState.password" placeholder="請輸入密碼"/>

      <button @click="handleSubmit">登入</button>
    </a-card>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';

import { ROUTES } from '@/assets/definitions/routes'
import { profile } from '@/mock/student'

export default {
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();

    const formState = reactive({
      username: '',
      password: '',
    });

    const handleSubmit = () => {
      if (
        formState.username === import.meta.env.VITE_USERNAME
        && formState.password === import.meta.env.VITE_PASSWORD
      ) {
        store.dispatch('Auth/login', profile);
        router.push({ name: ROUTES.HOME });
      } else {
        notification['error']({
          message: '登入失敗',
          description:
            '請確認帳號與密碼是否輸入正確',
        });
      }
    };

    onMounted(() => {
      store.commit('updateLoadingStatus', false);
    })

    return {
      store,
      router,
      formState,

      handleSubmit,
    }
  }
}
</script>

<style lang="scss">
#login {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafafa;

  .login_card {
    width: 400px;
  }
}
</style>
