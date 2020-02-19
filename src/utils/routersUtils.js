import React from "react"
import { Route } from "react-router-dom"
import { Breadcrumb, Icon, Menu } from "antd";
import routerStore from "../stores/routerStore";

const { SubMenu } = Menu;

/**
 * 获取根路由
 * @param routersConfig
 * @returns {*}
 */
function getRootRouters(routersConfig = []) {
    return routersConfig.map(config => <Route exact={!config.routes} path={config.path} component={config.component}/>)
}

/**
 * 获取某个父路由下的所有子路由
 * @param routersConfig
 */
function getRoutersByRootRouters(routersCpn, rootRoutersConfig, path = "") {
    if (rootRoutersConfig.routes) {
        let fatherPath = path + rootRoutersConfig.path;
        rootRoutersConfig.routes.forEach(config => {
            if (config.component)
                routersCpn.push(<Route exact path={fatherPath + config.path} component={config.component}/>);

            if (config.routes) {
                getRoutersByRootRouters(routersCpn, config, fatherPath);
                return;
            }
        })
    }
}

/**
 * 获取某个父路的sidebar
 * @param rootRoutersConfig
 */
function getSideBarByRootRouters(rootRoutersConfig, props) {
    function clickSideBarHandler(path) {
        props.history.replace(path)
    }

    return rootRoutersConfig.routes.map(route => {
        let path = rootRoutersConfig.path + route.path;
        if (!route.routes || route.routes.length == 0)
            return <Menu.Item key={route.key} onClick={() => clickSideBarHandler(path)}>
                <Icon type={route.icon}/>
                <span>{route.title}</span>
            </Menu.Item>

        return <SubMenu key={route.key}
                        title={<span><Icon type={route.icon || 'question'}/><span>{route.title}</span></span>}>
            {
                route.routes.map(r => {
                    return <Menu.Item key={r.key}
                                      onClick={() => clickSideBarHandler(path + r.path)}>{r.title}</Menu.Item>
                })
            }
        </SubMenu>
    });
}

/**
 * 获取某个父路由获取面包屑
 */
function getBreadCrumb(rootRoutersConfig, props) {
    let breadCrumb = [];

    let paths = props.location.pathname.split("/").filter(function (path) {
        return path && path.trim();
    });

    transformBreadCrumb(rootRoutersConfig, paths, 0);

    function transformBreadCrumb(rootRoutersConfig, paths, index, fatherPath = "") {
        let c = rootRoutersConfig.find(config => config.path === "/" + paths[index]);
        if (c && c.isRoot !== true && c.component) {
            if (paths.length === index + 1)
                breadCrumb.push(<Breadcrumb.Item>{c.title}</Breadcrumb.Item>);
            else
                breadCrumb.push(<Breadcrumb.Item onClick={() => props.history.replace(fatherPath + c.path)}>
                    <a>{c.title}</a>
                </Breadcrumb.Item>);
        }
        if (c && c.routes) {
            transformBreadCrumb(c.routes, paths, index + 1, fatherPath + c.path);
        }
    }

    return breadCrumb;
}


/**
 * 监听router变化，当router变化时改变左侧sidebar的显示
 * @param props
 */
function listenRouterChange(rootRoutersConfig, props) {
    props.history.listen((router, type) => {
        let routerConfig = rootRoutersConfig.routes.find(config => router.pathname.indexOf(config.path) !== - 1);
        if (!!routerConfig.routes) {
            routerConfig = routerConfig.routes.find(config => router.pathname.indexOf(config.path) !== - 1) || routerConfig;
        }
        routerStore.setSelectedKeys([routerConfig.key])
    })
}


export default {
    getRootRouters,
    getRoutersByRootRouters,
    getSideBarByRootRouters,
    getBreadCrumb,
    listenRouterChange
};
