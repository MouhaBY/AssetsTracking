import { combineReducers, createStore } from 'redux'
import authReducer from './Reducers/authenticationReducer'


const reducer = combineReducers({
    authReducer
})

const store = createStore(reducer)

export default store