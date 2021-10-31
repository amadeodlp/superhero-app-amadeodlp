import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./Navbar";
import Home from "./Home";
import Search from "./Search";
import Login from "./Login";
import useToken from './useToken';

const App = () => {
const { token, setToken } = useToken();
if(!token) {
return <Login setToken={setToken} />
}

 return ( 
        <Router>
            <NavigationBar/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/Search">
                    <Search/>
                </Route>
            </Switch>
        </Router>
 )
}

export default App;
