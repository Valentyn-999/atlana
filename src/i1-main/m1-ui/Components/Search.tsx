import React from 'react';
import {searchTC} from "../../m2-bll/searchReducer";
import {AppRootStateType} from "../../m2-bll/store";
import {UsersDataType} from "../../m3-dal/gitHub-api";
import 'antd/dist/antd.css';
import {Input, Layout, Spin, Table, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Content, Header} from 'antd/lib/layout/layout';
import style from './styles/Search.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from "../Routes";
import {getUserNameAC} from "../../m2-bll/profileReducer";

export const Search:React.FC = () => {
    const dispatch = useDispatch()
    const users = useSelector<AppRootStateType, Array<UsersDataType>>(s => s.users.data)
    const loading = useSelector<AppRootStateType, boolean>(s => s.users.loading)
    const {Title} = Typography


    const searchForProf = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.split(' ').join('')
        dispatch(searchTC(value))
    }


    const data = users.map((user) => ({
        ava: user.avatar_url,
        name: user.login,
        key: user.id
    }))


    const columns = [
        {
            title: 'Ava',
            dataIndex: 'ava',
            key: 'ava',
            width: '150px',
            render: (value: any) => {
                return <div>
                    <NavLink to={PATH.PROFILE}>
                        <img className={style.ava} src={value} alt={'/'}/>
                    </NavLink>
                </div>
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '150px',
            render: (value: React.ReactNode) => {
                return <div>
                    <NavLink to={PATH.PROFILE}>{value}</NavLink>
                </div>;
            },
        },
    ]

    const getNameOnClick = (name: string) => {
        dispatch(getUserNameAC(name))
    }

    return <>
        <Layout>
            <Header className={style.menuBar}>
                <Title>GitHub Searcher</Title>
                <Input onChange={searchForProf}/>
            </Header>
            <Spin spinning={loading}>
                <Content>
                    <Table dataSource={data}
                           columns={columns}
                           onRow={(record) => {
                               return {
                                   onClick: () => {
                                       getNameOnClick(record.name)
                                   },
                               };
                           }}

                    />
                </Content>
            </Spin>
        </Layout>
    </>
}