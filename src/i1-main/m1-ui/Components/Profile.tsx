import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {getUserNameTC} from '../../m2-bll/profileReducer';
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {ReposDataType, UserDataType} from "../../m3-dal/gitHub-api";
import {Card, Input, Layout, Spin} from 'antd';
import style from "./styles/Profile.module.css";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {animateScroll} from "react-scroll";


export const Profile:React.FC = () => {
    const dispatch = useDispatch()
    const userName = useSelector<AppRootStateType, string>(s => s.profile.name)
    const state = useSelector<AppRootStateType, UserDataType>(s => s.profile.data)
    const repos = useSelector<AppRootStateType, Array<ReposDataType>>(s => s.profile.repo)
    const loading = useSelector<AppRootStateType, boolean>(s => s.profile.loading)

    const [filteredRepos, setFilteredRepos] = useState<Array<ReposDataType>>([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        dispatch(getUserNameTC(userName))

    }, [userName, dispatch])
    useEffect(()=>{
        setFilteredRepos(repos)
        const res = repos.filter(el => el.name.includes(inputValue))
        setFilteredRepos(res)
        }, [setFilteredRepos, repos, inputValue]
    )
    if (userName === '') {
        return <Redirect to={PATH.SEARCH}/>
    }

    const filterMe = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setInputValue(value)
        scrollToBottom()
    }

    function scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "options-holder"
        });
    }

    const joinDate = state?.created_at?.split('T')[0]
    const itIsUnknown = 'NO INFO'


    return (
        <Layout className={style.main}>
            <Title className={style.headerBar}>GitHub Searcher</Title>
            <Spin spinning={loading}>
                <Content className={style.contentContainer}>
                    <Card
                        hoverable
                        cover={<a className={style.card} rel="noopener noreferrer"
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
                    <Input placeholder={"Search for users' repositories"} onChange={filterMe}/>
                </div>
                <div>
                    {filteredRepos.map((el: ReposDataType) => (
                        <a key={el.id} href={el.html_url} rel="noopener noreferrer" target="_blank">
                            <div className={style.repos}>
                                <div className={style.singeRepo}>Name: {el.name}</div>
                                <span className={style.singeRepo}>⭐️: {el.stargazers_count}</span>
                                <span className={style.singeRepo}>Forks: {el.forks_count}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </Spin>
        </Layout>
    )
}