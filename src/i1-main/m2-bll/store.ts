import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {searchReducer} from "./searchReducer";
import {profileReducer} from "./profileReducer";




const rootReducer = combineReducers({
    users: searchReducer,
    profile: profileReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;