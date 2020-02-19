import React, { Component } from "react";
import { Button } from "antd";

export default class Register extends Component {

    render() {
        return <Button type="primary" onClick={()=> this.props.history.push("/home")}>login</Button>
    }

}
