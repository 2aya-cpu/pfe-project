import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que ce fichier existe bien

const app = createApp(App);
app.use(router);
app.mount('#app');
