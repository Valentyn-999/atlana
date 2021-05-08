import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {getUserNameTC} from '../../m2-bll/profileReducer';
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {UserDataType} from "../../m3-dal/api";
import {Card, Input, Layout} from 'antd';
import style from "./styles/Profile.module.css";
import {Header} from "antd/lib/layout/layout";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";


export const Profile = () => {
    const dispatch = useDispatch()
    const userName = useSelector<AppRootStateType, string>(s => s.profile.name)
    const state = useSelector<AppRootStateType, UserDataType>(s => s.profile.data)
    const {Meta} = Card;

    // const data = []
    // const newData = data.push(state)

    useEffect(() => {
        dispatch(getUserNameTC(userName))
    }, [userName])

    if (userName === '') {
        return <Redirect to={PATH.SEARCH}/>
    }

    const joinDate = state?.created_at?.split('T')[0]
    const itIsUnknown = 'NO INFO'

    return (
        <Layout className={style.main}>
            <Title className={style.headerBar}>GitHub Searcher</Title>
            <Content className={style.contentContainer}>
                <Card
                    hoverable
                    // style={{width: 240}}
                    cover={<a className={style.card}
                              href={state.html_url} target="_blank"><img alt="example" src={state.avatar_url}/></a>}
                >
                    <div className={style.description}>{state.bio}</div>
                </Card>
                <div className={style.mainContent}>
                    <div className={style.peaceOfContent}>UserName: {state.login ? state.login : itIsUnknown}</div>
                    <div className={style.peaceOfContent}>Email: {state.email ? state.email : itIsUnknown}</div>
                    <div
                        className={style.peaceOfContent}>Location: {state.location ? state.location : itIsUnknown}</div>
                    <div className={style.peaceOfContent}>Join data: {joinDate ? joinDate : itIsUnknown}</div>
                    <div
                        className={style.peaceOfContent}>Followers: {state.followers ? state.followers : itIsUnknown}</div>
                    <div
                        className={style.peaceOfContent}>Following: {state.following ? state.following : itIsUnknown}</div>
                </div>
            </Content>
            <div className={style.searchRepo}>
                <Input placeholder={"Search for users' repositories"} onChange={ () => {} }/>
            </div>
            <div>
                {/*{state.}*/}
            </div>
        </Layout>
    )
}