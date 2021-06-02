import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Profile from './Profile.jsx';

export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Layout} />
                <Route
                    exact
                    path='/chat/:chatId/'
                    render={obj => <Layout
                        chatId={obj.match.params.chatId}
                    />
                    }
                />
                <Route
                    exact path='/profile/' component={Profile}
                />
            </Switch>
        )
    }
}
//Сделать страницу профиля, располагающуюся по пути /profile/, и ссылку на нее в Header’е мессенджера.