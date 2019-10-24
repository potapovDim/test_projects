import {INIT_STORE} from './action.contants'

function initStore(state) {
  return {
    type: INIT_STORE,
    state
  }
}

function caseStore(state = [], action) {
  switch(action.type) {
    case INIT_STORE:
      return action.state
    default:
      return state
  }
}

export {
  caseStore,
  initStore
}
