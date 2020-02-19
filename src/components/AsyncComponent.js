import Loadable from 'react-loadable';

const asyncComponent = (component) => Loadable({
    loader: component,
    loading: () => null,
});

export default asyncComponent;
