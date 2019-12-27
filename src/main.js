import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import AvatarUploader from 'vue-image-crop-upload';
import VueChatScroll from 'vue-chat-scroll';
import CoverFlow from 'vue-coverflow';
import VModal from 'vue-js-modal';
import Viewer from 'v-viewer';
import VTitle from 'v-title';
import VEmbed from 'vue-embed';
 

import 'v-title/lib/element-ui';
import 'viewerjs/dist/viewer.css';

Vue.use('avatar-uploader', AvatarUploader);
Vue.use(VueChatScroll);
Vue.use(CoverFlow);
Vue.use(VTitle);
Vue.use(VModal);
Vue.use(Viewer);
Vue.use(VEmbed);


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
