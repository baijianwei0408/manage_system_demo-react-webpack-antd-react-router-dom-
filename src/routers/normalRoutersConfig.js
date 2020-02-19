import asyncComponent from "../components/AsyncComponent";


const Login = asyncComponent(() => import("../pages/platform/login"));
const Register = asyncComponent(() => import("../pages/platform/register"));


const normalRoutersConfig = [
    { path: "/", title: '登陆', component: Login },
    { path: "/login", title: '登陆', component: Login },
    { path: "/register", title: '注册', component: Register }
];

export default normalRoutersConfig;
