export default (component, state) =>
    new Promise(resolve => component.setState(state, resolve))
