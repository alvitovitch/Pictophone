import { RECEIVE_DEMO } from "../actions/demo_actions";

let preloadedState = null;

const DemoReducer = (state = preloadedState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_DEMO:
      return action.demo;
    // case REMOVE_DEMO:
    //   return null;
    default:
      return state;
  }
}

export default DemoReducer;