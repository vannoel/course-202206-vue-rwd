<template>
  <div id="absence_form" class="page">
    <a-breadcrumb>
      <a-breadcrumb-item>學生資訊系統</a-breadcrumb-item>
      <a-breadcrumb-item>出缺勤紀錄</a-breadcrumb-item>
      <a-breadcrumb-item>紀錄單</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card class="page_card">
      <a-form :model="formState" name="basic" :label-col="{ span: 8 }" autocomplete="off" @finish="onFinish">

        <a-form-item label="學號" name="id" >
          <a-input :value="formState.id" disabled/>
        </a-form-item>

        <a-form-item label="課程代碼" name="classroomId" :rules="[{ required: true, message: '請輸入課程代碼' }]">
          <a-input v-model:value="formState.classroomId" :disabled="route.params.id !== 'new'"/>
        </a-form-item>

        <a-form-item label="假別" name="absenceType" :rules="[{ required: true, message: '請選取假別' }]">
          <a-select ref="select" v-model:value="formState.absenceType">
            <template v-for="option of TYPE" :key="option.value">
              <a-select-option :value="option.value">{{ option.label }}</a-select-option>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item label="起始時間" name="absenceBegin" :rules="[{ required: true, message: '請選取起始時間' }]">
          <a-date-picker v-model:value="formState.absenceBegin" show-time :disabled-date="disabledBeginDate" :disabled="route.params.id !== 'new'"/>
        </a-form-item>

        <a-form-item label="迄止時間" name="absenceEnd" :rules="[{ required: true, message: '請選取迄止時間' }]">
          <a-date-picker v-model:value="formState.absenceEnd" show-time :disabled-date="disabledEndDate" :disabled="route.params.id !== 'new'"/>
        </a-form-item>

        <a-form-item label="備註" name="absenceNotation">
          <a-textarea v-model:value="formState.absenceNotation" :rows="4" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <div class="card_buttonGroup">
            <router-link :to="{ name: ROUTES.ABSENCE_MANAGEMENT }">
              <a-button type="text" class="card_button">
                取消
              </a-button>
            </router-link>
            <a-button type="primary" html-type="submit">送出</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import { ROUTES } from '@/assets/definitions/routes';
import { TYPE } from '@/assets/definitions/absence';

import { list } from '@/mock/absence';

export default {
  name: 'AbsenceFormView',
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const user = computed(() => store.state.Auth.user);

    const formState = reactive({
      id: user.value.id,
      classroomId: '',
      absenceType: '',
      absenceBegin: null,
      absenceEnd: null,
      absenceNotation: ''
    });

    const onFinish = () => {
      notification['success']({
        message: '新增成功',
      });
      router.push({ name: ROUTES.ABSENCE_MANAGEMENT });
    }
    const disabledBeginDate = (current) => {
      return current && formState.absenceEnd && current > formState.absenceEnd;
    }
    const disabledEndDate = (current) => {
      return current && formState.absenceBegin && current < formState.absenceBegin;
    }

    onMounted(() => {
      // if it is not new
      if(route.params.id !== 'new') {
        const result = list.find((item)=>{
          return item.recordId === route.params.id
        })
        if(result) {
          formState.classroomId = result.classroomId;
          formState.absenceType = result.absenceType;
          formState.absenceBegin = dayjs(result.absenceBegin * 1000);
          formState.absenceEnd = dayjs(result.absenceEnd * 1000);
          formState.absenceNotation = result.absenceNotation;
        }
      }

      store.commit('updateLoadingStatus', false);
    })

    return {
      ROUTES,
      TYPE,

      route,
      formState,

      onFinish,
      disabledBeginDate,
      disabledEndDate
    }
  }
}
</script>

<style lang="scss">
#absence_form {
  &.page {
    padding: 12px;

    .page_card {
      margin-top: 12px;

      .ant-card-body {
        padding: 12px;
      }

      .card_table {
        .table_link {
          &:hover {
            color: #1890ff;
          }
        }
      }

      .card_buttonGroup {
        display: flex;
        justify-content: flex-end;
        column-gap: 12px;
      }
    }
  }
}
</style>