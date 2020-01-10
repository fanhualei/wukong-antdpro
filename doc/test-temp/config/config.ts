import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
            },
            {
              path: '/store',
              icon: 'crown',
              name: 'store',
              routes: [
                //商品总览页面
                {
                  name: 'store',
                  path: '/store/store/',
                  component: './store/store/list',
                }, // 等级列表页面
                {
                  name: 'storeGrade',
                  path: '/store/storeGrade/',
                  component: './store/storeGrade/list',
                }, // 编辑商品等级页面
                {
                  hideInMenu: true,
                  path: '/store/storeGrade/edit',
                  component: './store/storeGrade/edit',
                }, //编辑帮助信息
                {
                  hideInMenu: true,
                  path: '/store/storeHelp/list/edit',
                  component: './store/storeHelp/list/edit',
                }, // 店铺帮助
                {
                  name: 'storeHelp',
                  //二级菜单
                  path: '/store/storeHelp',
                  component: './store/storeHelp',
                  hideChildrenInMenu: true,
                  //隐藏三级菜单
                  routes: [
                    {
                      path: '/store/storeHelp',
                      redirect: '/store/storeHelp/list',
                    },
                    {
                      path: '/store/storeHelp/list',
                      name: 'list',
                      //exact: true, // 在路由上不配匹下一级菜单，例如新弹出的编辑菜单
                      component: './store/storeHelp/list',
                    },
                    {
                      path: '/store/storeHelp/type',
                      name: 'type',
                      component: './store/storeHelp/type',
                    },
                  ],
                },
              ],
            },
            {
              name: 'list.basic-list',
              icon: 'smile',
              path: '/listbasiclist',
              component: './ListBasicList',
            },
            {
              name: '查询表格',
              icon: 'smile',
              path: '/listtablelisttwo',
              component: './ListTableListTwo',
            },
            {
              name: 'list.table-list',
              icon: 'smile',
              path: '/listtablelist',
              component: './ListTableList',
            }, // 空白页面
            {
              name: 'emptypage',
              icon: 'smile',
              path: '/emptypage',
              component: './EmptyPage',
            }, // 高级表单
            {
              name: 'advanced-form',
              icon: 'smile',
              path: '/formadvancedform',
              component: './FormAdvancedForm',
            },
            {
              name: 'accountcenter',
              icon: 'smile',
              path: '/accountcenter',
              component: './AccountCenter',
            },
            {
              name: 'activity',
              icon: 'smile',
              path: '/activity',
              component: './activity',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
} as IConfig;
