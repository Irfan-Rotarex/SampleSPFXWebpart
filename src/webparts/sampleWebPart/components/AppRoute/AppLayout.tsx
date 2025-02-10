 
import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { IAppContext } from '../Context/IAppContext';
import { UserProvider } from '../Context/AppContext';
import Home from '../Views/Home';
import Search from '../Views/Search';

export function AppLayout(props: IAppContext) {
    return (
        <UserProvider value={props}>
            <HashRouter>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/Search" exact component={Search} />
                    </Switch>
                </div>
            </HashRouter>
        </UserProvider>
    );
}
            
