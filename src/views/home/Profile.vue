<template>
  <div id="profile" class="page">
    <a-breadcrumb>
      <a-breadcrumb-item>學生資訊系統</a-breadcrumb-item>
      <a-breadcrumb-item>個人資料</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card class="page_card">
      <a-row :gutter="[12, 12]">
        <a-col :span="6">
          <img :src="user.photo" />
        </a-col>
        <a-col :span="18">
          <a-row>
            <a-col :span="6">
              <label>學號</label>
              <p>{{ user.id }}</p>
            </a-col>
            <a-col :span="6">
              <label>中文名稱</label>
              <p>{{ user.name_zh }}</p>
            </a-col>
            <a-col :span="6">
              <label>英文名稱</label>
              <p>{{ user.name_en }}</p>
            </a-col>
            <a-col :span="6">
              <label>身份別</label>
              <p>{{ user.type }}</p>
            </a-col>
            <a-col :span="6">
              <label>系所</label>
              <p>{{ user.department }}</p>
            </a-col>
            <a-col :span="6">
              <label>組別</label>
              <p>{{ user.group }}</p>
            </a-col>
            <a-col :span="6">
              <label>年級</label>
              <p>{{ user.year }}</p>
            </a-col>
            <a-col :span="6">
              <label>年級</label>
              <p>{{ user.year }}</p>
            </a-col>
            <a-col :span="6">
              <label>班級</label>
              <p>{{ user.class }}</p>
            </a-col>
            <a-col :span="6">
              <label>入學年</label>
              <p>{{ user.enrollmentYear }}</p>
            </a-col>
            <a-col :span="6">
              <label>聯絡電話</label>
              <p>{{ user.phone }}</p>
            </a-col>
            <a-col :span="6">
              <label>聯絡地址</label>
              <p>{{ user.address }}</p>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { notification } from 'ant-design-vue';

const dataKeys = [
  { id: 'name_zh', label: '中文姓名'},
  { id: 'name_en', label: '英文姓名'},
  { id: 'id', label: '學號'},
  { id: 'type', label: '身份別'},
  { id: 'year', label: '年級'},
  { id: 'department', label: '系所'},
  { id: 'group', label: '組別'},
  { id: 'class', label: '班級'},
  { id: 'enrollmentYear', label: '入學年'},
  { id: 'phone', label: '聯絡電話'},
  { id: 'address', label: '租屋地址'},
]

export default {
  name: 'ProfileView',
  setup() {
    const store = useStore();

    const user = computed(() => store.state.Auth.user);

    onMounted(() => {
      store.commit('updateLoadingStatus', false);
    })

    const updateProfile = () => {
      notification['success']({
        message: '更新成功',
      });
    }

    return {
      user,

      dataKeys,
      updateProfile
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