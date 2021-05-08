import {githubAPI, UsersDataType} from "../m3-dal/api";
import {AxiosResponse} from "axios";
import {Dispatch} from "redux";



const initialState = {
    data: [] as Array<UsersDataType>
}

type InitialStateType = typeof initialState

export const searchReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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
export const searchTC = (data: string) => (dispatch: Dispatch) => {
    githubAPI.getUsers(data)
        .then((res: AxiosResponse<any>) => {
            const data: Array<UsersDataType> = res.data.items
            dispatch(usersAC(data))
        })
        .catch((err) => {
            console.log('sth went wrong!!!')
            // const error = err.response
            //     ? err.response.data.error : (err.message + ', more details in the console');
            // dispatch(onErrorAC(error))
            // message.error(error)
        })
}

const getUsers = 'getUsers'