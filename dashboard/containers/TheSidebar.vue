<template>

  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="26" 
        viewBox="0 0 910 166"
        style="margin-left: -85px;margin-top: 7px;"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logoPic" 
        size="custom-size" 
        :height="26" 
        viewBox="0 0 150 166"
      />
    </CSidebarBrand>

    <CRenderFunction @click.native="(e) => test(e)"
    flat :content-to-render="nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
         
</template>

<script>
import _ from "underscore";
import { mapGetters } from "vuex";
import QRCode from "../components/QRCode.vue";

export default {
  name: 'TheSidebar',
  components: {
    QRCode
  },
  data() {
    return {
      warningModal: false,
    }
  },
  computed: _.extend({
    show() {
      return this.$store.state.sidebarShow
    },
    minimize() {
      return this.$store.state.sidebarMinimize
    },
    nav(){ return [{
        _name: 'CSidebarNav',
        _children: [
          {
            _name: 'CSidebarNavTitle',
            _children: [this.$t('sidebar.yourApp')]
          },
          {
            _name: 'CSidebarNavItem',
            name: this.shortLink,
            href: 'https://'+ this.link,
            target: "_blank",
            icon: 'cil-bookmark',
            addLinkClasses : []
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.qrcode'),
            to: '',
            addLinkClasses : ['QR'],
            icon: 'cil-qr-code'       
          },
          {
            _name: 'CSidebarNavTitle',
            _children: [this.$t('sidebar.menu')]
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.menu'),
            to: '/dashboard',
            icon: 'cil-restaurant',
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.upload'),
            to: '/upload',
            icon: 'cil-arrow-thick-from-bottom',
            addLinkClasses : [this.place.showImport=='true'?'':'is-hidden'],
            badge: {
              color: 'primary',
              text: 'New',
              shape: 'pill'
            }
          },
          {
            _name: 'CSidebarNavTitle',
            _children: [this.$t('sidebar.orders')]
          },

          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.myOrders'),
            to: '/orders',
            icon: 'cil-basket'

          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.myCustomers'),
            to: '/customers',
            icon: 'cil-smile'

          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.notifications'),
            to: '/notifs',
            icon: 'cil-bell',
            
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.payments'),
            to: '/payments',
            icon: 'cil-wallet'
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.delivery'),
            to: '/delivery',
            icon: 'cil-truck'
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.options'),
            to: '/ordering_settings',
            icon: 'cil-settings'
          },
          {
            _name: 'CSidebarNavTitle',
            _children: [this.$t('sidebar.settings')]
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.settings'),
            to: '/settings',
            icon: 'cil-settings',
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.design'),
            to: '/design',
            icon: 'cil-paint-bucket'
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.analytics'),
            to: '/analytics',
            icon: 'cil-chart-line'
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.account'),
            to: '/profile',
            icon: 'cil-user',
            badge: this.trialBage
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.logout'),
            to: '/logout',
            icon: 'cil-account-logout'
          },
          {
            _name: 'CSidebarNavDivider',
            _class: 'm-1'
          },
          {
            _name: 'CSidebarNavItem',
            name: this.$t('sidebar.help'),
            href: "javascript:void(Tawk_API.toggle())",
            
            icon: 'cil-life-ring'
          },
        ],
      }]
    },
    shortLink() {
      if (!this.place.url) return "..."
      else if (this.place.url.length > 10) 
        return this.place.url + '...'
      else 
        return this.place.url + '.' + this.place.domain
    },
    link() {
      return this.place.url + '.' + this.place.domain
    },
    trialBage() {
      if (this.place.isTrial && this.place.isTrial=="true") 
        return {
              color: 'primary',
              text: this.$t('sidebar.upgrade'),
              shape: 'pill'
            }
    }
  },
  mapGetters({
      headers: "getHeaders",
      place: "getPlaceInfo"
    }),
  ),
  methods: {
    test(e) {
      console.log(e.target.className);
      if (e.target.className.includes("QR")) {   
        this.$buefy.modal.open({
                    parent: this,
                    component: QRCode,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true
                    }
                )
      }
      
    },

  },

  created() {
    
  }
}

</script>
<style>
.c-sidebar {
  background-color: #332f2f;
}
.c-sidebar .c-sidebar-nav-link:hover {
  background-color: #4d4b4b;

}
.c-sidebar-nav-link, .c-sidebar-nav-dropdown-toggle {
  padding: 5px 1rem;
}

.badge-warning {
    color: #fff;
    background-color: #fda43c;
}

.badge-primary {
    color: #fff;
    background-color: #19a360;
}
</style>
