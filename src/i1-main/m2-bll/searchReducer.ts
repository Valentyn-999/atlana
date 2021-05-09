import {githubAPI, UsersDataType} from "../m3-dal/gitHub-api";
import {AxiosResponse} from "axios";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";
import {message} from "antd";


const initialState = {
    data: [] as Array<UsersDataType>,
    loading: false as boolean
}

type USERS = ReturnType<typeof usersAC>
type CHANGE_STATUS = ReturnType<typeof changeStatusAC>


type InitialStateType = typeof initialState
type ActionsType = USERS | CHANGE_STATUS
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>


export const searchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getUsers:
            return {...state, data: action.data}
        case changeStatus:
            return {...state, loading: action.data}
        default:
            return state
    }
}
//ac
export const usersAC = (data: Array<UsersDataType>) =>
    ({type: getUsers, data} as const)
export const changeStatusAC = (data: boolean) =>
    ({type: changeStatus, data} as const)

//tc
export const searchTC = (data: string): ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(changeStatusAC(true))
    githubAPI.getUsers(data)
        .then((res: AxiosResponse<any>) => {
            const data: Array<UsersDataType> = res.data.items
            dispatch(usersAC(data))
        })
        .catch((err) => {
            const error = err.response.data
                ? err.response.data.message
                : (err.message + ', more details in the console');
            message.error(error)
        })
        .finally(() => {
            dispatch(changeStatusAC(false))
        })
}

const getUsers = 'getUsers'
const changeStatus = 'changeStatus'