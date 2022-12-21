import Vue from 'vue'
import CoreuiVue from '@coreui/vue';
Vue.use(CoreuiVue);
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { cilPencil, cilSettings } from '@coreui/icons'
import { iconsSet as icons } from './assets/icons/icons.js'
Sentry.init({
  dsn: 'XXXXXXXXXXXXXXXXXX',
  integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
});

import router from './router'
import cognitoAuth from './cognito'
import App from './App.vue'
import Buefy from 'buefy'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faCaretDown, faCaretUp, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(
  faPaperPlane, faCaretDown, faCaretUp)


import '@/assets/css/mystyles.css'
import '@/assets/css/app.css'
import 'buefy/dist/buefy.css'
import VueTimepicker from 'vue2-timepicker'
import VueMultianalytics from 'vue-multianalytics'
import * as filestack from 'filestack-js';
const client = filestack.init('XXXXXXXXXXXXXXXXXX')
import VueI18n from 'vue-i18n'
import VuePageTitle from 'vue-page-title'
import VueYandexMetrika from 'vue-yandex-metrika'        
import VueGtm from 'vue-gtm';

Vue.use(VueGtm, {
  id: 'GTM-XXXXXXXXXXXXXXXXXX', 
  vueRouter: router, 
});
 
 
Vue.use(VueYandexMetrika, {
    id: "XXXXXXXXXXXXXXXXXX",
    router: router,
    icons: { cilPencil, cilSettings },
    env: process.env.NODE_ENV,
    debug: false,
    options: {
      clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
    }
})

Vue.use(VuePageTitle)

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
})


Vue.use(Buefy, {
  defaultIconComponent: FontAwesomeIcon,
  defaultIconPack: 'fas',
});

import { EmojiPickerPlugin } from 'vue-emoji-picker'
import './registerServiceWorker'
Vue.use(EmojiPickerPlugin)

Object.defineProperty(Vue.prototype, '$filestack', { value: client });

let mixpanelConfig = {
  token: 'XXXXXXXXXXXXXXXXXX',
  config: {},
  debug: false
}

Vue.use(VueMultianalytics, {
  modules: {
    mixpanel: mixpanelConfig
  },
  routing: {
    vueRouter: router
  }
})

Vue.use(VueTimepicker)

Vue.config.productionTip = false

Vue.directive(
    "clickOutside", {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target) || event.target.id.includes("item") || (typeof event.target.className == "string" && event.target.className.includes("delete")))) {
            {
              vnode.context[binding.expression](event);
            }
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  ),

  Vue.directive(
    "focus", {
      inserted(el) {
        el.focus()
      },
    },
  ),

  Vue.directive('add-class-hover', {
    bind(el, binding) {    
      const { value="" } = binding;
      el.addEventListener('mouseenter',()=> {
          el.classList.add(value)
      });
      el.addEventListener('mouseleave',()=> {
          el.classList.remove(value)
      });
    },
    unbind(el) {
      el.removeEventListener('mouseenter');
      el.removeEventListener('mouseleave')
    }
  })

  new Vue({
    el: '#app',
    i18n,
    icons,
    router,
    cognitoAuth,
    render: h => h(App)
  })

  function loadLocaleMessages () {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)
      if (matched && matched.length > 1) {
        const locale = matched[1]
        messages[locale] = locales(key)
      }
    })
    return messages
  }