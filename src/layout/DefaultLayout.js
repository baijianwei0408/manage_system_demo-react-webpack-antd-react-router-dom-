import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "./DefaultLayout.less";
import routers from "../routers";
import routersUtils from "../utils/routersUtils";
import { observer, inject } from "mobx-react";
import routerStore from "../stores/routerStore";

const { Header, Content, Footer, Sider } = Layout;

@inject("routerStore")
@observer
class DefaultLayout extends Component {

    state = {
        collapsed: false,
    };

    routersCpn = []; // 当前父路由下的所有路由

    constructor(props) {
        super(props);

        const currentRootRouter = routers.find(router => router.path === this.props.match.path);
        routersUtils.getRoutersByRootRouters(this.routersCpn, currentRootRouter);
        console.log("==currentRootRouters==>", this.routersCpn)

        // 监听路由改变，路由改变，更新左侧sidebar状态
        routersUtils.listenRouterChange(currentRootRouter, props)
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {

        return (
            <Layout className="default-layout">
                <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo"/>
                    {/*顶部导航栏*/}
                    <Menu theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={['2']}
                          style={{ lineHeight: '64px' }}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout style={{ marginTop: 64 }}>
                    {/*左侧sidebar*/}
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                           style={{
                               overflow: 'auto',
                               height: '100vh',
                               position: 'fixed',
                               left: 0,
                           }}>
                        <Menu mode="inline"
                              theme="dark"
                              defaultOpenKeys={['1-1']}
                              defaultSelectedKeys={['1-1-1']}
                              openKeys={routerStore.openKeys}
                              selectedKeys={routerStore.selectedKeys}
                              onOpenChange={(openKeys) => routerStore.setOpenKeys(openKeys)}
                              onSelect={({ selectedKeys }) => routerStore.setSelectedKeys(selectedKeys)}
                        >
                            {
                                routersUtils.getSideBarByRootRouters(routers.find(router => router.path === this.props.match.path), this.props)
                            }
                        </Menu>
                    </Sider>
                    <Sider collapsible collapsed={this.state.collapsed} style={{ visibility: "hidden" }}/>

                    <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
                        {/*面包屑*/}
                        <Breadcrumb style={{ margin: '16px 0' }} separator=">">
                            {
                                routersUtils.getBreadCrumb(routers, this.props)
                            }
                        </Breadcrumb>

                        {/*主要内容区*/}
                        <Content className="content">
                            {
                                this.routersCpn
                            }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }

}

export default DefaultLayout;
