import {githubAPI, ReposDataType, UserDataType} from "../m3-dal/api";
import {AxiosResponse} from "axios";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";



const initialState = {
    name: '',
    data: {} as UserDataType,
    repo: [] as Array<ReposDataType>
}

type GET_USER_NAME = ReturnType<typeof getUserNameAC>
type GET_USER_DATA = ReturnType<typeof getUserDataAC>
type GET_REPOS_DATA = ReturnType<typeof getReposDataAC>


type InitialStateType = typeof initialState
type ActionsType = GET_USER_NAME | GET_USER_DATA | GET_REPOS_DATA
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>


export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getUserName:
            return {...state, name: action.name}
        case getUserData:
            return {...state, data: action.data}
        case getReposData:
            return {...state, repo: action.data}
        default:
            return state
    }
}
//ac
export const getUserNameAC = (data: string) => ({type: getUserName, name: data} as const)
export const getUserDataAC = (data: UserDataType) => ({type: getUserData, data} as const)
export const getReposDataAC = (data: Array<ReposDataType>) => ({type: getReposData, data} as const)

//tc
export const getUserNameTC = (data: string): ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    githubAPI.getProfile(data)
        .then((res: AxiosResponse<any>) => {
            const data: UserDataType = res.data
            dispatch(getUserDataAC(data))
        })
        .catch((err) => {
            const error = err.response.data
                ? err.response.data.message
                : (err.message + ', more details in the console');
            console.log(error)
        })
    githubAPI.getRepos(data)
        .then((res: AxiosResponse<any>) => {
            const data: Array<ReposDataType> = res.data
            dispatch(getReposDataAC(data))
        })
        .catch((err) => {
            const error = err.response.data
                ? err.response.data.message
                : (err.message + ', more details in the console');
            console.log(error)

        })
}

const getUserName = 'getUserName'
const getUserData = 'getUserData'
const getReposData = 'getReposData'