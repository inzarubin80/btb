import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'

import Login from './components/loginPage/LoginPage.js';
import Heder from './components/Heder/Heder.js';
import Makets from './components/Maket/Makets.js';


import MaketCard from './components/Maket/MaketCard';

import Reports from './components/Reports/Reports';
import ReportCard from './components/Reports/ReportCard';
import Start from './components/Start/Start';

import MaketProject from './components/MaketProjet/MaketProject';


import { useSelector } from 'react-redux';
import { MaketCardState } from './context/MaketCard/MaketCardState';
import { ReportsState } from './context/Reports/ReportsState';
import { MaketProjectState } from './context/ProjectMaket/MaketProjectState';

import  firebase from './firebase'

function App() {


    return (
        <div className="btb">

            <Router>

                <>

                    <Heder />

                    <Switch>

                        

                        <Route path="/login">
                            <Login />
                        </Route>


                        <PrivateRoute exact path="/">
                            <Start />
                        </PrivateRoute>


                        <PrivateRoute exact path="/makets">
                            <Makets />
                        </PrivateRoute>

                        <PrivateRoute path="/makets/:id">
                            <MaketCardState>
                                <MaketCard />
                            </MaketCardState>
                        </PrivateRoute>

                        <PrivateRoute exact path="/reports">
                            <ReportsState>
                                <Reports />
                            </ReportsState>
                        </PrivateRoute>

                        <PrivateRoute exact path="/maket-project/:id">
                            <MaketProjectState>
                                <MaketProject />
                            </MaketProjectState>
                        </PrivateRoute>
                        

                        <PrivateRoute path="/reports/:id">
                            <ReportsState>
                                <ReportCard />
                            </ReportsState>
                        </PrivateRoute>


                        <Route path="*">
                            <NoMatch />
                        </Route>

                    </Switch>
                </>
            </Router>
        </div>
    )
}

function PrivateRoute({ children, ...rest }) {

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}


function NoMatch() {
    let location = useLocation();

    return (
        <div>
            <h3>
                ????????????????, ???????????? ???? ???????????????? ?????? ???????????????? ??????????????. ?????????????????? ???????????????????????? ????????????, ???? ?????????????? ???? ?????????????????? ??????????????.
        </h3>
        </div>
    );
}


export default App;
