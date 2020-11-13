import React from "react";
import "./App.css";
import Login from "./components/login";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import ExamInfo from "./components/examInfo";
import NotFound from "./components/notFound";
import TakeTest from "./components/takeTest";
import Register from "./components/register";
import Testing from "./components/testing";
import Header from "./components/header";

function App() {
  return (
    <Router>
      <Switch>

        {/* <Route to="/exam-info" render={(props) => {
          if (localStorage.getItem('rollNo'))
            return <ExamInfo {...props} />
          else
            return <Login {...props} />
        }} /> */}

        <Route path="/exam-info"
          render={(props) => {
            if (localStorage.getItem('ONLINE_EXAM_SESSION'))
              return <ExamInfo />
            else
              return <Redirect to="/login" />
          }
          }
        />

        <Route path="/login"
          render={(props) => {
            if (localStorage.getItem('ONLINE_EXAM_SESSION'))
              return <Redirect to="/exam-info" {...props} msg='Already logged in'/>
            else
              return <Login {...props}/>
            }
          }
        />

        <Route path='/register'
          render = {(props) => {
            if (localStorage.getItem('ONLINE_EXAM_SESSION'))
              return <Redirect to='/exam-info' {...props} msg='Need to logout first'/>
            else
              return <Register {...props}/>
          }}
        />
        <Route path="/take-test" component={TakeTest} />
        
        {/* Testing */}
        <Route path='/testing' component={Testing} />
        {/* // Testing // */}
        
        <Redirect exact from="/" to="/exam-info" />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
}

export default App;
