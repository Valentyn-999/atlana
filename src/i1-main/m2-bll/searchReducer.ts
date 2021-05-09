import {githubAPI, UsersDataType} from "../m3-dal/api";
import {AxiosResponse} from "axios";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";
import {message} from "antd";


const initialState = {
    data: [] as Array<UsersDataType>
}

type USERS = ReturnType<typeof usersAC>


type InitialStateType = typeof initialState
type ActionsType = USERS
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>


export const searchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getUsers:
            return {...state, data: action.data}
        default:
            return state
    }
}
//ac
export const usersAC = (data: Array<UsersDataType>) =>
    ({type: getUsers, data} as const)

//tc
export const searchTC = (data: string): ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    githubAPI.getUsers(data)
        .then((res: AxiosResponse<any>) => {
            const data: Array<UsersDataType> = res.data.items
            dispatch(usersAC(data))
        })
        .catch((err) => {
            debugger
            const error = err.response.data
                ? err.response.data.message
                : (err.message + ', more details in the console');
            message.error(error)
        })
}

const getUsers = 'getUsers'