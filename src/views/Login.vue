<template>
  <div id="login">
    <a-card class="login_card" title="學生資訊系統">
      <a-form name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
        <a-form-item label="帳號" name="username">
          <a-input v-model:value="formState.username" placeholder="請輸入帳號" />
        </a-form-item>
        <a-form-item label="密碼" name="password">
          <a-input v-model:value="formState.password" type="password" placeholder="請輸入密碼" />
        </a-form-item>
      </a-form>

      <div class="card_buttonGroup">
        <a-button type="primary" @click="handleSubmit">登入</a-button>
      </div>
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
        // vuex: save data of student to vuex
        store.dispatch('Auth/login', profile);

        // vue-router: redirect page to home after login
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
  background: #e6f7ff;

  .login_card {
    width: 400px;

    @media (max-width: 768px) {
      margin: 0 16px;
    }
  }

  .card_buttonGroup {
    text-align: center;
  }
}
</style>
