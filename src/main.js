import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'u-reset.css'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import stroe from './store'
Vue.use(Vant);
Vue.use(ElementUi);

Vue.config.productionTip = false

new Vue({
  router,
  stroe,
  render: h => h(App)
}).$mount('#app');
