<template>
  <CFooter :fixed="true" style="background:white!important; height:60px; padding:0">
    <div class="columns is-mobile has-text-centered is-gapless" style="width:100%; font-size:14px">
      <div class="column is-one-fifth" @click="$router.push('/orders')">
        <CIcon 
                heigth="36"
                name="cil-basket"
                />
          <p>{{ $t('sidebar.orders') }}</p>
      </div>
      <div class="column is-one-fifth" @click="$router.push('/customers')">
        <CIcon 
                heigth="36"
                name="cil-smile"
                />
                <p>{{ $t('sidebar.customers') }}</p>
      </div>
      <div class="column is-one-fifth" @click="$router.push('/dashboard')">
        <CIcon 
                heigth="36"
                name="cil-restaurant"
                />
                <p>{{ $t('sidebar.menu') }}</p>
      </div>
      <div class="column is-one-fifth" @click="$router.push('/settings')">
        <CIcon 
                heigth="36"
                name="cil-settings"
                />
                <p>{{ $t('sidebar.settings') }}</p>
      </div>
      <div class="column is-one-fifth" @click="$store.commit('toggleSidebarMobile')">
        <CIcon 
                heigth="36"
                name="cil-menu"
                />
                <p>{{ $t('sidebar.more') }}</p>
      </div>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheBottomMenu'
}
</script>
