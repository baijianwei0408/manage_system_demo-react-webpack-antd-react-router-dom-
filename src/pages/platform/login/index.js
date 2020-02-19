import React, { Component } from "react";
import { Button } from "antd";

export default class Login extends Component {

    render() {
        return <div>
            <Button type="primary" onClick={()=> this.props.history.push("/platform")}>login</Button>
        </div>
    }

}
