import normalRoutersConfig from "./normalRoutersConfig";
import platformRoutersConfig from "./platformRoutersConfig";
import systemRoutersConfig from "./systemRoutersConfig";

const routers = [
    ...normalRoutersConfig,
    ...platformRoutersConfig,
    ...systemRoutersConfig
];

export default routers;
