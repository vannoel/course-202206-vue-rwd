import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/scss/index.scss';

import { Antd } from '@/plugins/ant-deign-vue';
import Components from '@/components';

const app = createApp(App);

app.use(store).use(router).use(Antd).use(Components);

app.mount('#app');