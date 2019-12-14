import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VModal from 'vue-js-modal';
import Viewer from 'v-viewer'

import 'viewerjs/dist/viewer.css'

Vue.use(VModal);
Vue.use(Viewer)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
