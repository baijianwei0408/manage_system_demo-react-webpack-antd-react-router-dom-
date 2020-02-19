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
