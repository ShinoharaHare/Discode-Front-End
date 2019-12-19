import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


import VueChatScroll from 'vue-chat-scroll';
import VTooltip from 'v-tooltip';
import VModal from 'vue-js-modal';
import Viewer from 'v-viewer';
import VTitle from 'v-title';
 

import 'v-title/lib/element-ui';
import 'viewerjs/dist/viewer.css';
import './tooltip.scss';

Vue.use(VueChatScroll);
Vue.use(VTooltip);
Vue.use(VTitle);
Vue.use(VModal);
Vue.use(Viewer);


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
