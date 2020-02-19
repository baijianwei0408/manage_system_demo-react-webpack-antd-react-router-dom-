import { observable, action } from "mobx";
import React from "react";


class routerStore {
    @observable openKeys = sessionStorage.getItem("openKeys") || [];
    @observable selectedKeys = sessionStorage.getItem("selectedKeys") || [];

    @action
    setOpenKeys = (openKeys) => {
        sessionStorage.setItem("openKeys", openKeys);
        this.openKeys = openKeys
    };

    @action
    setSelectedKeys = (selectedKeys) => {
        sessionStorage.setItem("selectedKeys", selectedKeys);
        this.selectedKeys = selectedKeys
    };
}


export default new routerStore();
