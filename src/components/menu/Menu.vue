<template>
  <div class="module-menu">
    <a-menu id="module" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" :mode="mode">
      <template v-for="layer1 in menuList" :key="layer1.routeName">
        <div>
          <a-menuItem :key="layer1.routeName">
            <router-link class="menu_button" :to="{ name: layer1.routeName }">
              {{ layer1.label }}
            </router-link>
          </a-menuItem>
        </div>
        <!-- <template v-if="layer1.children">
          <a-sub-menu popupClassName="module-menu-popup" :popupOffset="[0, 0]" :key="layer1.routeName">
            <template #title>
              <div>
                {{ layer1.label }}
              </div>
            </template>
            <template v-for="layer2 in layer1.children" :key="layer2.routeName">
              <a-menuItem>
                <router-link class="menu_button" :to="{ name: layer2.routeName }">
                  {{ layer2.label }}
                </router-link>
              </a-menuItem>
            </template>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menuItem :key="layer1.routeName">
            <router-link class="menu_button" :to="{ name: layer1.routeName }">
              {{ layer1.label }}
            </router-link>
          </a-menuItem>
        </template> -->
      </template>
    </a-menu>
  </div>
</template>

<script>
import { inject, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { ROUTES } from "@/assets/definitions/routes";

const menuList = [
  {
    routeName: ROUTES.BILLBOARD,
    label: "學校公告",
  },
  {
    routeName: ROUTES.COURSE,
    label: "選課資訊",
  },
  {
    routeName: ROUTES.ABSENCE,
    label: "出缺勤紀錄",
  },
  {
    routeName: ROUTES.DORMITORY,
    label: "宿舍資訊",
  },
  {
    routeName: ROUTES.PARTTIME,
    label: "工讀時數紀錄",
  },
  {
    routeName: ROUTES.PROFILE,
    label: "個人資料",
  },
];

export default {
  name: 'module-menu',
  setup() {
    const route = useRoute();
    const sidebarCollapsedStatus = inject("sidebarCollapsedStatus");

    const mode = sidebarCollapsedStatus ? "inline" : "vertical";

    const selectedKeys = ref([]);
    const openKeys = ref([]);

    onMounted(() => {
      selectedKeys.value.push(route.name );
    })

    return {
      route,
      selectedKeys,
      openKeys,

      mode,

      menuList
    }
  },
}
</script>

<style lang="scss">
.module-menu {
  .ant-menu {
    background: transparent;
    border-width: 0;

    &.ant-menu-inline-collapsed {
      .ant-menu-item {
        padding: 0 16px;
      }
    }
  }

  .ant-menu-item {
    display: flex;
    align-items: center;
    height: 44px !important;
    border-width: 0;

    .ant-menu-item-icon {
      flex-shrink: 0;
    }
  }
}
</style>