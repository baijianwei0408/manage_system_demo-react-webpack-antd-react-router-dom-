import { observable, action } from "mobx";

class TestStore {
    @observable num = 0;
}

export default new TestStore();
