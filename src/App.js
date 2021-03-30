import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
 
import Login from './components/loginPage/loginPage'

function App() {
  return (
    <div className="btb">
     
        <Router>
            <>

                <Switch>
                    <Route path="/" exact component={Login}/>
                </Switch>
              
               
            </>
        </Router>
     
    </div>
)
}

export default App;
