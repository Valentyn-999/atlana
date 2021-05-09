import {githubAPI, ReposDataType, UserDataType} from "../m3-dal/gitHub-api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";


const initialState = {
    name: '',
    data: {} as UserDataType,
    repo: [] as Array<ReposDataType>,
    loading: false as boolean
}

type GET_USER_NAME = ReturnType<typeof getUserNameAC>
type GET_USER_DATA = ReturnType<typeof getUserDataAC>
type GET_REPOS_DATA = ReturnType<typeof getReposDataAC>
type CHANGE_LOADING_STATUS = ReturnType<typeof changeLoadingStatusAC>


type InitialStateType = typeof initialState
type ActionsType = GET_USER_NAME | GET_USER_DATA | GET_REPOS_DATA | CHANGE_LOADING_STATUS
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>


export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getUserName:
            return {...state, name: action.name}
        case getUserData:
            return {...state, data: action.data}
        case getReposData:
            return {...state, repo: action.data}
        case changeLoadingStatus:
            return {...state, loading: action.data}
        default:
            return state
    }
}

//ac
export const getUserNameAC = (data: string) => ({type: getUserName, name: data} as const)
export const getUserDataAC = (data: UserDataType) => ({type: getUserData, data} as const)
export const getReposDataAC = (data: Array<ReposDataType>) => ({type: getReposData, data} as const)
export const changeLoadingStatusAC = (data: boolean) => ({type: changeLoadingStatus, data} as const)

//tc
export const getUserNameTC = (data: string): ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(changeLoadingStatusAC(true))
    const pr1 = githubAPI.getProfile(data)
    const pr2 = githubAPI.getRepos(data)
    Promise.all([pr1, pr2])
        .then((res: any[]) => {
            const data1: UserDataType = res[0].data
            dispatch(getUserDataAC(data1))
            const data2: Array<ReposDataType> = res[1].data
            dispatch(getReposDataAC(data2))
        }).catch((err) => {
        const error = err.response.data
            ? err.response.data.message
            : (err.message + ', more details in the console');
        console.log(error)
    }).finally(() => {
        dispatch(changeLoadingStatusAC(false))
    })
}

const getUserName = 'getUserName'
const getUserData = 'getUserData'
const getReposData = 'getReposData'
const changeLoadingStatus = 'changeLoadingStatus'