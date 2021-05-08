import {githubAPI, ReposDataType, UserDataType} from "../m3-dal/api";
import {AxiosResponse} from "axios";
import {Dispatch} from "redux";


const initialState = {
    name: '',
    data: {} as UserDataType,
    repo: []
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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
export const getUserNameTC = (data: string) => (dispatch: Dispatch) => {
    githubAPI.getProfile(data)
        .then((res: AxiosResponse<any>) => {
            const data: UserDataType = res.data
            console.log(data)
            dispatch(getUserDataAC(data))
        })
        .catch((err) => {
            console.log('sth went wrong!!!')
        })
    githubAPI.getRepos(data)
        .then((res: AxiosResponse<any>) => {
            const data: Array<ReposDataType> = res.data
            dispatch(getReposDataAC(data))
        })
}

const getUserName = 'getUserName'
const getUserData = 'getUserData'
const getReposData = 'getReposData'