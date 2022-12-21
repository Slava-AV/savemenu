<template>
  <div id="app">
        <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app',

    data() {
      return {
        loggedIn: false,
      }
    },

    mounted() {
      this.$cognitoAuth.isAuthenticated(loggedIn => {
        this.loggedIn = loggedIn
      })
      this.$cognitoAuth.onChange = loggedIn => {
        this.loggedIn = loggedIn;
      }

    },
    
  }
</script>