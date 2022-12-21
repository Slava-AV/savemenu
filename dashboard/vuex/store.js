import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    placeInfo: {},
    identityId: "",
    logoUrl: "",
    sidebarShow: 'responsive',
    sidebarMinimize: false
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [createPersist({
        namespace: 'savemenu',
        initialState: {},
        // ONE_WEEK
        expires: 7 * 24 * 60 * 60 * 1e3
    })]
})