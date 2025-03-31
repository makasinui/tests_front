import { Icon } from '@iconify/vue';
import { Title, Select, Spinner, Button, Checkbox, ErrorField, Input, Modal } from '@/components';
import type { App } from 'vue';

export default {
    install(app: App) {
        app.component('Icon', Icon);
        app.component('Title', Title);
        app.component('Select', Select);
        app.component('Spinner', Spinner);
        app.component('Button', Button);
        app.component('Checkbox', Checkbox);
        app.component('ErrorField', ErrorField);
        app.component('Input', Input)
        app.component('Modal', Modal)
    }
}