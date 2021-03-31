import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
 
import Login from './components/LoginPage/LoginPage'
import heder from './components/heder/heder'


function App() {

 const login = true
  return (
    <div className="btb">
     
     {!login && <Login/>}

     {login && <heder/>}

     {login && <Router>
            <>
                <Switch>
                    <Route path="/" exact component={Login}/>
                </Switch>      
            </>
        </Router>}

     
    </div>
)
}

export default App;
