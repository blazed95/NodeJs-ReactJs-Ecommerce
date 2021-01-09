import React from "react";
import Login from './Components/Sign/Login.js'
import ForgotPassword from './Components/Sign/ForgotPassword'
import Register from './Components/Sign/Register.js'
import Logout from './Components/Sign/Logout.js'
import Dashboard from './Components/Dashboard'
import Product from './Components/Shop/Product'
import Cart from './Components/Shop/Cart'
import Checkout from './Components/Shop/Checkout'
import { AuthProvider } from "./Contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route, /*useHistory*/ } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const browserHistory = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
  forceRefresh: true,
})

const App = () => {
  require('dotenv').config();
  //const history = useHistory();

  return (
    <div className="App">
      <Router >
        <AuthProvider browserHistory={browserHistory}>
          <Switch>
            <Route exact path="/" render={() => (
              <Dashboard
              />
            )}
            />
            <Route path="/login" render={() => (
              <Login
              />
            )}
            />
            <Route path="/register" render={() => (
              <Register browserHistory={browserHistory}
              />
            )}
            />
            <Route path="/logout" component={Logout} browserHistory={browserHistory} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/product" component={Product} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>

  )
}
export default App;


