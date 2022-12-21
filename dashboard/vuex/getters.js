export default {
    getItems: state => state.placeInfo.menu,
    getHeaders: state => state.placeInfo.menu.filter(function(el){
        return el.itemType == "Header"
      }),
    getPlaceInfo: state => state.placeInfo,
    getIdentityId: state => state.identityId,
    getLogoUrl: state => state.logoUrl,
    getPublishedState: state => state.canPublish
}