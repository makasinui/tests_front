import { createApp } from 'vue';

import './style.css';

import App from './App.vue';
import router from './router';
import globalComponents from './plugins/globalComponents';

const app = createApp(App);
app.use(router);
app.use(globalComponents);

app.mount('#app');
