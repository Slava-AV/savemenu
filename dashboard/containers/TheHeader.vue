<template>
  <CHeader fixed light style="position:fixed;">
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderNav class="d-md-down-none mr-auto">
    </CHeaderNav>
    <CHeaderNav class="mr-4 ml-auto"> 
      <dashboard-table-generate />
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import DashboardTableGenerate from "@/components/DashboardTableGenerate.vue";

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt,
    DashboardTableGenerate
  }
}
</script>
