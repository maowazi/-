import React from 'react';
import {HashRouter as HRouter,Route,Switch,Redirect} from "react-router-dom";
import store from "./store/store";
import {Provider} from "react-redux";

import {viewRouter} from "./router/router";
function App() {
  return (
    <div className="App">
        <Provider store={store}>
        <HRouter>
            <Switch>
                        {
                            viewRouter.map((item,index)=>(
                                <Route path={item.pathName} component={item.component} key={index}/>
                            ))
                        }
                        <Redirect from="/" to="/home"/>
            </Switch>

        </HRouter>
        </Provider>
      </div>
  );
}

export default App;
