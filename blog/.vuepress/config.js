module.exports = {
    title: 'Blog', // Title for the site. This will be displayed in the navbar.
    theme: '@vuepress/theme-blog',
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            // set `platform` rather than `api`
            platform: 'github-v4',
            locale: 'zh', // 语言
            // all other options of Vssue are allowed
            owner: 'zengh1',
            repo: 'blog-vue',
            clientId: 'fd8586c3fd6e80f1f40e',
            clientSecret: '0ca47c67246a3fb8a21ad935db1096110e36db9f',
            // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
            autoCreateIssue:true
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
                text: '标签',
                link: '/tag/',
            },
            {
                text: 'linux',
                link: '/linux/',
            },
            {
                text: 'issues',
                link: '/issues/',
            },
            {
                text: '数据结构/算法',
                link: '/dsal/',
            },
            {
                text: '放松一下',
                link: '/relax/',
            }
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
        // 目录分类器
        directories: [
            {
                id: 'linux',
                dirname: '_linux',
                path: '/linux/',
                itemPermalink: '/linux/:year/:month/:day/:slug'
            },
            {
                id: 'index',
                dirname: '_posts',
                path: '/',
                itemPermalink: '/:year/:month/:day/:slug'
            },
            {
                id: 'issues',
                dirname: '_issues',
                path: '/issues/',
                itemPermalink: '/issues/:year/:month/:day/:slug'
            },
            {
                id: 'dsal',
                dirname: '_dsal',
                path: '/dsal/',
                itemPermalink: '/dsal/:year/:month/:day/:slug'
            },
            {
                id: 'relax',
                dirname: '_relax',
                path: '/relax/',
                itemPermalink: '/relax/:year/:month/:day/:slug'
            }
        ],
    }
}


