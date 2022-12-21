import * as types from './mutation_types'

export default {
  [types.POPULATE_MENU_ITEMS](state, items) {
    state.menuItems = items;
  },
  [types.POPULATE_PLACE_INFO](state, info) {
    state.placeInfo = info;
  },
  [types.SET_IDENTITYID](state, info) {
    state.identityId = info;
  },
  [types.SET_LOGO_URL](state, image) {
    state.logoUrl = image;
  },
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  }
}