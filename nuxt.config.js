export default {
    components: true,

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
                'faCogs'
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