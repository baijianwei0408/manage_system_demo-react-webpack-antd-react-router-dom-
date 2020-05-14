import asyncComponent from "../components/AsyncComponent";
// 异步加载路由组件
const DefaultLayout = asyncComponent(() => import("../layout/DefaultLayout"));
const Blog = asyncComponent(() => import("../pages/platform/blog"));
const Resume = asyncComponent(() => import("../pages/platform/resume"));
const User = asyncComponent(() => import("../pages/platform/user"));


const platformRoutersConfig = [
    {
        path: "/platform",
        title: "平台",
        component: DefaultLayout,
        isRoot: true,
        key: '1',
        routes: [
            {
                path: "/home",
                title: '首页',
                key: '1-1',
                icon: "user",
                routes: [
                    {
                        path: "/user",
                        title: '用户',
                        component: User,
                        key: '1-1-1',
                        routes: [
                            {
                                path: "/userDetail",
                                title: '用户详情',
                                component: User,
                                key: '1-1-1-1',
                                routes: [
                                    {
                                        path: "/otherUser",
                                        title: '其他用户',
                                        component: User,
                                        key: '1-1-1-1-1',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            { path: "/blog", title: '博客', icon: "laptop", key: '1-2', component: Blog },
            { path: "/resume", title: '摘要', icon: "notification", key: '1-3', component: Resume },
            { path: "/user", title: '用户', icon: "user", key: '1-4', component: User }
        ]
    }
];

export default platformRoutersConfig;
