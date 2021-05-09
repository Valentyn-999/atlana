import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Error404 from "./Components/Error404";
import {Profile} from "./Components/Profile";
import {Search} from "./Components/Search";


export const PATH = {
    SEARCH: '/search',
    PROFILE: '/profile'
}

function Routes() {
    return (
        <div>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.SEARCH}/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.SEARCH} render={() => <Search/>}/>


                <Route path={'/404'} render={() => <Error404/>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default Routes;