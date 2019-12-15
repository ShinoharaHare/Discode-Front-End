import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VModal from 'vue-js-modal';
import Viewer from 'v-viewer';
import VTooltip from 'v-tooltip'


import 'viewerjs/dist/viewer.css'
import './tooltip.scss'

Vue.use(VModal);
Vue.use(Viewer);
Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
