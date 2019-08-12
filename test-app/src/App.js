import React from 'react';
import Header from "./components/Header";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainPage from "./components/MainPage";
import AboutPage from "./components/AboutPage";
import AuthorizationPage from "./components/AuthorizationPage";
import { createStore} from "redux";
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Header/>
                </div>
                <Route path="/" exact component={MainPage}/>
                <Route path="/Authorization/" component={AuthorizationPage}/>
                <Route path="/about/" component={AboutPage}/>
            </Router>
        </Provider>

    );
}

export default App;
