<template>
  <div class="c-app">
    <b-modal :active.sync="welcomeModal" @close="closeWelcome('native')" :width="640" scroll="keep">
        <div class="card">
          <header class="modal-card-head has-text-centered">
            <p class="modal-card-title">Enter Your Menu Items</p>
          </header>
            <div class="modal-card-body">
                <div class="box">
                <p style="font-size: 12px;margin-top: -7px;margin-left: -10px;margin-bottom: 14px !important;">Option 1</p>
                <p class="title is-6">We enter it for you.</p>
                <p>You submit your menu as a picture or PDF.</p> 
                <p>We type it within 2 working days.</p>
                <p><i>₹199 one time fee.</i></p>
                <button @click="closeWelcome('submit_menu_as_picture');$router.push('/upload')" class="button is-success is-outlined is-fullwidth" style="margin: 1.5rem 0 0rem;border-width:2px;font-weight:600!important; ">Please Enter Menu for Me</button>
                </div>
                <div class="box">
                  <p style="font-size: 12px;margin-top: -7px;margin-left: -10px;margin-bottom: 14px !important;">Option 2</p>
                  <p class="title is-6">Enter menu yourself</p>
                <button @click="closeWelcome('selfupload')" class="button is-success is-outlined is-fullwidth" style="border-width:2px;font-weight:600!important; ">I Will Enter Menu Myself</button>
                </div>
              </div>
                  
        </div>
        </b-modal>
      <div v-if="loading" class="modal-background flex-center" style="z-index: 1000;">
        <div class="spinner"></div>
    </div>
    <TheSidebar/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body" style="margin-top: 40px;" :class="{'mb-6':is.mobile()}">
        <main class="c-main">
          <CContainer fluid id="dashboard-container">
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
    </CWrapper>
    <div v-if="is.mobile()" style="margin-top:60px;">

    <TheBottomMenu />
    </div>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheBottomMenu from './TheBottomMenu'
import _ from "underscore";
import is from "is_js"
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheBottomMenu
  },

  data() {
    return {
      slidemenu: true,
      imageKey: 0,
      user: {},
      loading: true,
      welcomeModal: false,
      installBtn: "none",
      showTrialBar: true,
      tawk: {},
      is: is
    };
  },
  computed: _.extend(
    {
    
    },
    mapGetters({
      place: "getPlaceInfo"
    }),
  ),
  methods: _.extend({}, mapActions(["populatePlaceInfo", "updatePlaceInfo"]), {
    closeWelcome: function(source) {
      this.$ma.trackEvent({category: 'event', action: 'Welcome modal closed', properties: {context: source}})
      this.welcomeModal = false;
      this.place.firstLogin = "false";
      this.updatePlaceInfo(this.place);
    },
    goto(url) {
      this.$ma.trackEvent({category: 'event', action: 'App opened from welcome modal', label : null, value : null})
      window.open(url,'_blank');
    },
    installDialog() {
      this.$ma.trackEvent({category: 'event', action: 'Install app dialog opened', label : null, value : null});
      if (is.opera()) {
        this.$buefy.dialog.alert({
          type: 'is-success',
          message: this.$t('Dashboard.msgOpera')
        })
      }
      else if (is.firefox()) {
        this.$buefy.dialog.alert({
          type: 'is-success',
          message: this.$t('Dashboard.msgFF')
        })
        }
      else if (is.chrome()) {
        this.$buefy.dialog.confirm({
          message: this.$t('Dashboard.msgChrome'),
          title: this.$t('Dashboard.installApp'),
          type: 'is-success',
          confirmText: this.$t('Dashboard.yes'),
          cancelText: this.$t('Dashboard.back'),
          onConfirm: () => {
            this.$ma.trackEvent({category: 'event', action: 'Install app dialog confirmed', label : null, value : null});
            this.installer();
          },
          onCancel: () => {this.$ma.trackEvent({category: 'event', action: 'Install app dialog closed', label : null, value : null});}
        })
      }
      else if (is.safari()) {
        this.$buefy.dialog.alert({
          type: 'is-success',
          message: this.$t('Dashboard.msgSafari')
        })
      }
      else {
        this.$buefy.dialog.alert({
          type: 'is-success',
          message: this.$t('Dashboard.msgUnsupported')
        })
      }
    }
  }),
  mounted() {
    var fn = function (e) {
      e.returnValue = "null";
    }

    window.addEventListener("beforeunload", fn);

    if (window.innerWidth < 500) this.slidemenu = false; //hide side menu on small screens
    if (window.location.href.indexOf("emailclick") > -1) {
      this.$ma.trackEvent({
        category: "event",
        action: "Email link clicked",
        properties: {
          "Link name": window.location.href.split("emailclick=")[1]
        }
      });
    }
    this.$cognitoAuth.refreshSession(options => {
      // // eslint-disable-next-line
      if (options=="need_refresh") {
        console.log("need_refresh")
        this.$ma.trackEvent({
          category: "event",
          action: "Session expired",
          label: null,
          value: null
        });
        this.$buefy.dialog.alert({
          message: this.$t('Dashboard.sessionExp'),
          confirmText: this.$t('Dashboard.refresh'),
          type: 'is-info',
          onConfirm: () => {
            console.log("refreshing")
            location.reload();
          }
        })
      } else {
      this.populatePlaceInfo(options).then(() => {
        this.$ma.identify({ userId: options.email });
        this.$ma.setUserProperties({
          userId: options.email,
          $first_name: this.place.placeName,
          $email: options.email,
          url: this.place.url,
        });
        this.$ma.setSuperProperties({build: 140})  
        this.$ma.trackEvent({
          category: "event",
          action: 'Page viewed: ' + this.$route.fullPath,
          label: null,
          value: null
        });
        if (this.$route.query.dialog == 'checklist') {
              
          this.$ma.trackEvent({
            category: "event",
            action: "See welcome message",
            label: null,
            value: null
          });
          setTimeout(()=>{        
            this.welcomeModal = true;
          },500)
        } else this.welcomeModal = false;
        this.loading = false;

      });
    }
    });

  
  var lang = this.$i18n.locale
  var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    if (lang == "ru")
      s1.src = 'https://embed.tawk.to/xxxxx/default';
    else
      s1.src = 'https://embed.tawk.to/xxxxx/default';
    s1.async = true;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);

  })();
  },
  created() {
    let installPrompt;
    window.addEventListener('beforeinstallprompt', e => {
      this.installBtn = "block"
      // Stash the event
      installPrompt = e;
    });

    if (is.mobile() && is.not.chrome() && !window.matchMedia('(display-mode: standalone)').matches) {
            this.installBtn = "block"
          }
    if (is.mobile() && is.opera() && !window.matchMedia('(display-mode: standalone)').matches) {
      this.installBtn = "block"
    }   

    window.addEventListener('appinstalled', () => {
      this.installBtn = "none"
      this.$buefy.toast.open(this.$t('Dashboard.installSoon'))   
      // console.log("App installed!")
    });

    this.installer = () => {
      if (installPrompt == undefined) {
        this.$buefy.toast.open(this.$t('Dashboard.installNotAvailable'))
        return
      }
      installPrompt.prompt();
      installPrompt.userChoice.then(result => {
        if (result.outcome === 'accepted') {
          this.installBtn = "none";
          this.$ma.trackEvent({category: 'event', action: 'PWA installed: Chrome', label : null, value : null});
          console.log('Installation done')
        }
        else {
          this.$ma.trackEvent({category: 'event', action: 'PWA installation canceled: Chrome', label : null, value : null});
          console.log('User denied install')
        }
        installPrompt = null;
      })
    }
    
  },

}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (min-width: 1400px) {
  #dashboard-container {
  max-width: 1400px;
  }
}

</style>
