export default {
    components: true,

    head: {
        title: 'JuicyLoops',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
            {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
            { name: "og:type", property: "og:type", content: "website" },
            { name: "og:url", property: "og:url", content: 'https://juicyloops.daspete.at' },
            { name: "og:title", property: "og:title", content: "JuicyLoops" },
            { name: "og:description", property: "og:description", content: "JuicyLoops is a music production tool for the web. It allows you to create loops and play them back on the fly." },
            { name: "og:image", property: "og:image", content: "https://juicyloops.daspete.at/images/juicyloops.png" },
        ]
    },

    modules: [
        'portal-vue/nuxt',
    ],

    buildModules: [
        '@nuxtjs/fontawesome',
        '@nuxtjs/tailwindcss',
    ],

    fontawesome: {
        icons: {
            solid: [
                'faPlusCircle',
                'faMinusCircle',
                'faFolder',
                'faGlobe',
                'faFile',
                'faBars',
                'faEllipsisV',
                'faEyeSlash',
                'faEye',
                'faCheckCircle',
                'faNewspaper',
                'faSync',
                'faTimes', 
                'faStream',
                'faSitemap',
                'faPlay',
                'faStop',
                'faCircle',
                'faPause',
                'faTrash',
                'faVolumeMute',
                'faVolumeUp',
                'faCogs',
                'faChevronLeft',
                'faChevronRight',
            ],
            regular: [
                'faPlusSquare',
                'faMinusSquare',
            ],
        },
    },

    tailwindcss: {
        // jit: true,
    },
}