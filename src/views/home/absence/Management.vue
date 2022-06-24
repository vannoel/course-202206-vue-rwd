<template>
  <div id="absence_management" class="page">
    <a-breadcrumb>
      <a-breadcrumb-item>學生資訊系統</a-breadcrumb-item>
      <a-breadcrumb-item>出缺勤紀錄</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card class="page_card">
      <router-link :to="{ name: ROUTES.ABSENCE_FORM, params: { id: 'new' } }">
        <a-button class="card_button">
          填寫假單
        </a-button>
      </router-link>
      <a-table class="card_table" :dataSource="absenceFormList" :columns="columns" size="small">
        <template #bodyCell="{ text, record, column }">
          <template v-if="column.dataIndex === 'recordId'">
            <div class="table_header header-recordId">
              <router-link :to="{ name: ROUTES.ABSENCE_FORM, params: { id: text } }">
                <a-button type="text" class="table_link">
                  {{ text }}
                </a-button>
              </router-link>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'absenceTime'">
            <div class="table_header header-absenceTime">
              {{ formatTime(record.absenceBegin) }} <br />
              - {{ formatTime(record.absenceEnd) }}
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'applyAt'">
            <div class="table_header header-applyAt">
              {{ text ? formatTime(text) : '' }}
            </div>
          </template>
          <template v-else>
            <div class="table_header">
              {{ text }}
            </div>
          </template>
        </template>
      </a-table>
    </a-card>

    <div class="page_list">
      <router-link :to="{ name: ROUTES.ABSENCE_FORM, params: { id: 'new' } }">
        <a-button class="card_button">
          填寫假單
        </a-button>
      </router-link>
      <template v-for="record of list" :key="record.recordId">
        <a-card class="page_mobileCard">
          <a-row :gutter="[12, 12]">
            <template v-for="column of columns" :key="column.key">
              <a-col :span="12">{{ column.title }}</a-col>
              <a-col :span="12">{{ record[column.key] }}</a-col>
            </template>
          </a-row>
        </a-card>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import { ROUTES } from '@/assets/definitions/routes'

import { list } from '@/mock/absence';

const columns = [
  {
    title: '紀錄編號',
    dataIndex: 'recordId',
    key: 'recordId',
  },
  {
    title: '課程代碼',
    dataIndex: 'classroomId',
    key: 'classroomId',
  },
  {
    title: '課程名稱',
    dataIndex: 'classroomName',
    key: 'classroomName',
  },
  {
    title: '缺席時間',
    dataIndex: 'absenceTime',
    key: 'absenceTime',
  },
  {
    title: '缺席原因',
    dataIndex: 'absenceType',
    key: 'absenceType',
  },
  {
    title: '請假申請時間',
    dataIndex: 'applyAt',
    key: 'applyAt',
  },
  {
    title: '備註',
    dataIndex: 'absenceNotation',
    key: 'absenceNotation',
  },
]

export default {
  name: 'AbsenceManagementView',
  setup() {
    const store = useStore();
    const absenceFormList = ref([]);

    onMounted(() => {
      absenceFormList.value = list;
      store.commit('updateLoadingStatus', false);
    })

    const formatTime = ((unixtime) => {
      const time = new Date(unixtime * 1000);
      const month = (time.getMonth() + 1).toString().padStart(2, '0');
      const date = (time.getDate()).toString().padStart(2, '0');
      const hour = (time.getHours()).toString().padStart(2, '0');
      const minute = (time.getMinutes()).toString().padStart(2, '0');

      return `${month}/${date} ${hour}:${minute}`
    })
    return {
      ROUTES,
      list,
      columns,
      absenceFormList,

      formatTime
    }
  }
}
</script>

<style lang="scss">
#absence_management {
  &.page {
    padding: 12px;

    .page_card {
      margin-top: 12px;

      .ant-card-body {
        padding: 12px;
      }

      .card_button {
        margin-bottom: 12px;
      }

      .card_table {
        .table_link {
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }

  .page_list {
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    .card_button {
      margin-top: 12px;
    }

    .ant-card {
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .page_card {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .page_list {
    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>