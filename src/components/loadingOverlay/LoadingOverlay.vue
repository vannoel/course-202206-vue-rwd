<template>
  <div class="module-loading-overlay">
    <loading-outlined class="loading_icon" />
    <span>Loading ...</span>
  </div>
</template>

<script>
import { watch } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

export default {
  name: 'module-loading-overlay',
  components: {
    LoadingOutlined
  },
  props: {
    loading: {
      type: Boolean,
    },
  },
  setup(props) {
    watch(
      () => props.loading,
      () => {
        if (props.loading) {
          document.querySelector("#app").classList.add("loading");
        } else {
          document.querySelector("#app").classList.remove("loading");
        }
      }
    );
  }
}
</script>

<style lang="scss">
@keyframes fade-in {
  from {
    z-index: -1;
    background-color: rgba(255, 255, 255, 0);
    opacity: 0;
  }

  to {
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.75);
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.75);
    opacity: 1;
  }

  to {
    z-index: -1;
    background-color: rgba(255, 255, 255, 0);
    opacity: 0;
  }
}

#app {
  &.loading {
    .module-loading-overlay {
      animation: fade-in 0.3s ease-in-out forwards;
    }
  }

  &:not(.loading) {
    .module-loading-overlay {
      animation: fade-out 0.3s ease-in-out forwards;
    }
  }
}

.module-loading-overlay {
  transition: all 0.3s ease 0s;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 12px;
  font-size: 2em;

  .loading_icon {
    font-size: 3em;
  }
}
</style>