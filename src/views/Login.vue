<template>
  <div id="login">
    <a-card class="login_card" title="學生資訊系統">
      <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onFinish">
        <a-form-item label="帳號" name="username"
          :rules="[{ required: true, message: '請輸入帳號' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密碼" name="password" 
          :rules="[{ required: true, message: '請輸入密碼' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登入</a-button>
        </a-form-item>
      </a-form>
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

    const onFinish = (values) => {
      if (
        values.username === import.meta.env.VITE_USERNAME
        && values.password === import.meta.env.VITE_PASSWORD
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

    const handleSubmit = (event)=>{
      event.preventDefault();
      if (
        formState.username === import.meta.env.VITE_USERNAME
        && formState.password === import.meta.env.VITE_PASSWORD
      ) {
        store.dispatch('Auth/login', profile);
      } else {
        notification['error']({
          message: '登入失敗',
          description:
            '請確認帳號與密碼是否輸入正確',
        });
      }
    }

    return {
      store,
      router,
      formState,

      onFinish,
      // handleSubmit,
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
