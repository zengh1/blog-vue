module.exports = {
    title: 'Blog', // Title for the site. This will be displayed in the navbar.
    theme: '@vuepress/theme-blog',
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            // set `platform` rather than `api`
            platform: 'github',

            // all other options of Vssue are allowed
            owner: 'OWNER_OF_REPO',
            repo: 'NAME_OF_REPO',
            clientId: 'YOUR_CLIENT_ID',
            clientSecret: 'YOUR_CLIENT_SECRET',
        },
    },
    themeConfig: {
        // 导航栏上显示的链接
        nav: [
            {
                text: 'Blog',
                link: '/',
            },
            {
                text: 'Tags',
                link: '/tag/',
            },
            {
                text: 'linux',
                link: '/linux/',
            },
        ],

        // 底部栏
        footer: {
            // 联系人信息，显示在页脚的左侧。
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/vuejs/vuepress',
                },
                {
                    type: 'twitter',
                    link: 'https://github.com/vuejs/vuepress',
                },
            ],
            // 版权信息，显示在页脚右侧。
            copyright: [
                {
                    text: 'Privacy Policy',
                    link: 'https://policies.google.com/privacy?hl=en-US',
                },
                {
                    text: 'MIT Licensed | Copyright © 2018-present Vue.js',
                    link: '',
                },
            ],
        },
    }
}