/* eslint-disable */
var Manifest = `
{
    "name": "{{name}}",
    "short_name": "{{shortName}}",
    "theme_color": "{{content-bg-color}}",
    "background_color": "{{content-bg-color}}",
    "display": "standalone",
    "Scope": "/",
    "start_url": "/?utm_source=homescreen",
    "icons": [{
    "src": "{{fullHost}}/img/icon-512x512.png",
    "sizes": "512x512",
    "type": "image/png"
    },
    {
    "src": "{{fullHost}}/img/icon-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
    }],
    "splash_pages": null
    }
`
module.exports = Manifest;