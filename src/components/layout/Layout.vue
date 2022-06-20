<template>
  <a-layout class="module-layout">
    <a-layout-header class="layout_header">
      <a-button size="large" type="text" class="header_toogle" @click="handleSidebar">
        <menu-outlined />
      </a-button>
      <div class="header_title">
        學生資訊系統
      </div>
      <a-button size="large" type="text" class="header_logout" @click="handleLogout">
        <logout-outlined />
        登出
      </a-button>
    </a-layout-header>
    <a-layout class="layout_body">
      <a-layout-sider :collapsed="sidebarCollapsedStatus" collapsible :trigger="null" :width="200" :collapsedWidth="0" :class="[
        'body_side scrollable-y',
        { 'side-hide': sidebarCollapsedStatus },
      ]">
        <module-menu />
      </a-layout-sider>
      <a-layout-content class="body_content">
        <router-view />
      </a-layout-content>
    </a-Layout>
  </a-layout>
</template>

<script>
import { ref, provide } from "vue";
import { useStore } from 'vuex';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons-vue';

export default {
  name: 'module-layout',
  components: {
    LogoutOutlined,
    MenuOutlined
  },
  setup() {
    const store = useStore();
    const sidebarCollapsedStatus = ref(false); // true: opened, false: closed

    const handleUpdateSidebarCollapsedStatus = (value) => {
      sidebarCollapsedStatus.value = value;
    };

    const handleSidebar = () => {
      handleUpdateSidebarCollapsedStatus(!sidebarCollapsedStatus.value);
    };
    const handleLogout = () => {
      store.dispatch('Auth/logout');
    }

    provide("sidebarCollapsedStatus", sidebarCollapsedStatus);
    provide("updateSidebarCollapsedStatus", handleUpdateSidebarCollapsedStatus);
    return {
      sidebarCollapsedStatus,

      handleSidebar,
      handleLogout
    }
  }
}
</script>

<style lang="scss">
.module-layout {
  $nav-height: 60px;
  $side-width: 200px;

  .layout_header {
    color: #096dd9;
    background: #e6f7ff;
    padding: 0 12px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header_title {
      flex-grow: 1;
    }
  }

  .layout_body {
    height: calc(100vh - $nav-height);

    .body_side {
      padding-top: 8px;
      width: $side-width;
      height: inherit;
      background: #fafafa;
      border-right: 1px solid #f0f0f0;
    }

    .body_content {
      position: relative;
      z-index: 0;
      background: #fafafa;
      overflow: auto;
    }
  }
}
</style>