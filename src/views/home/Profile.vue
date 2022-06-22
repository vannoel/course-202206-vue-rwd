<template>
  <div id="profile" class="page">
    <a-breadcrumb>
      <a-breadcrumb-item>學生資訊系統</a-breadcrumb-item>
      <a-breadcrumb-item>個人資料</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card class="page_card">
      <div>
        <div>
          <img :src="user.photo" />
        </div>
        <div>
          <template v-for="key of dataKeys" :key="key.id">
            <div>
              <label>{{ key.label }}</label>
              <tempalte v-if="key.id === 'phone'">
                <input v-model="formPhone" />
              </tempalte>
              <tempalte v-else-if="key.id === 'address'">
                <input v-model="formAddress" />
              </tempalte>
              <tempalte v-else>
                <div>{{ user[key.id] }}</div>
              </tempalte>
            </div>
          </template>
          <button @click="handleUserInfo">更新</button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { notification } from 'ant-design-vue';

const dataKeys = [
  { id: 'name_zh', label: '中文姓名' },
  { id: 'name_en', label: '英文姓名' },
  { id: 'id', label: '學號' },
  { id: 'type', label: '身份別' },
  { id: 'year', label: '年級' },
  { id: 'department', label: '系所' },
  { id: 'group', label: '組別' },
  { id: 'class', label: '班級' },
  { id: 'enrollmentYear', label: '入學年' },
  { id: 'phone', label: '聯絡電話' },
  { id: 'address', label: '租屋地址' },
]

export default {
  name: 'ProfileView',
  setup() {
    const store = useStore();

    const user = computed(() => store.state.Auth.user);

    const formPhone = ref(user.value.phone);
    const formAddress = ref(user.value.address)

    onMounted(() => {
      store.commit('updateLoadingStatus', false);
    })

    const handleUserInfo = () => {
      store.dispatch('Auth/updateProfile', {
        phone: formPhone.value,
        address: formAddress.value
      });
      notification['success']({
        message: '更新成功',
      });
    }

    return {
      user,
      formPhone,
      formAddress,

      dataKeys,
      handleUserInfo
    }
  }
}
</script>

<style lang="scss">
#profile {
  &.page {
    padding: 12px;

    .page_card {
      margin-top: 12px;

      .ant-card-body {
        padding: 12px;

        label {
          font-size: 1.25em;
          font-weight: 500;
        }
      }

      .card_row {
        display: flex;
        column-gap: 12px;

        .row_pic {
          width: 40%;
          flex-shrink: 0;
        }

        .row_info {
          flex-grow: 1;
        }
      }
    }
  }
}
</style>