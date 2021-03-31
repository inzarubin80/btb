import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
 
import Login from './components/LoginPage/LoginPage'
import Heder from './components/Heder/Heder'
import Makets from './components/Maket/Makets'

import {useSelector} from 'react-redux';


function App() {


    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (
    <div className="btb">
     
     {!isLoggedIn && <Login/>}

     {isLoggedIn && <Heder/>}

     {isLoggedIn && <Router>
            <>
                <Switch>
                    <Route path="/" exact component={Makets}/>
                </Switch>      
            </>
        </Router>}

     
    </div>
)
}

export default App;
