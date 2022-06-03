import { combineReducers, createStore, applyMiddleware } from 'redux'
import { taskReducer } from './task-reducer'
import thunkMiddleware from 'redux-thunk'
import { gridReducer } from './grid-reducer'

const combineReducer = combineReducers({
  task: taskReducer,
  grid: gridReducer
})

export const store = createStore(
  combineReducer,
  applyMiddleware(thunkMiddleware)
)
