import {combineReducers, createStore} from 'redux';
import {caseStore} from './cases'

export default createStore(
  combineReducers({
    cases: caseStore
  })
)

