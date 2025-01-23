import { createApp } from 'vue'
import { Icon } from '@iconify/vue';

import './style.css'

import App from './App.vue'
import router from './router';
import { Title, Select } from './components';
import { ClickOutside } from './directives';

const app = createApp(App);
app.use(router);
app.component('Icon', Icon);
app.component('Title', Title);
app.component('Select', Select);
app.directive('click-outside', ClickOutside);
app.mount('#app')
