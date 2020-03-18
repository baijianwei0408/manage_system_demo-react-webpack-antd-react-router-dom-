import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from "mobx-react"
import stores from "@/stores"
import "@/static/less/common.less"
import routersUtil from "./src/utils/routersUtils";
import routers from "./src/routers";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound404 from "./src/components/NotFound404";

class App extends React.Component {

    render() {
        return (
            <Provider {...stores}>
                /**
                * 如果想在本地运行并不使用服务器就用 HashRouter ，这样直接打包好后就能通过index.html进入项目
                */
                <BrowserRouter>
                    <Switch>
                        {
                            routersUtil.getRootRouters(routers)
                        }
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }

}

ReactDom.render(<App/>, document.getElementById("app"));
