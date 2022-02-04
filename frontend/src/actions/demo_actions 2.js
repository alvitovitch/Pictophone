export const RECEIVE_DEMO = 'RECEIVE_DEMO';

export const receiveDemo = demo => {
  debugger
  return {
    type: RECEIVE_DEMO,
    demo
  }

}
export const REMOVE_DEMO = 'REMOVE_DEMO';

export const removeDemo = () => {
  return {
    type: REMOVE_DEMO,
  }
}