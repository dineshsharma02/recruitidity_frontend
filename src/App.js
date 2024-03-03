
import './App.css';
import JobPostingForm from "./Job/JobPostingForm"

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import Navigation from './Navigation';
import Home from './Home';
import Signup from './auth/Signup';
import Logout from './auth/Logout';
import JobListing from './Job/JobListing';
import YourJobs from './Job/YourJobs';


const App= () => {

  


  
  return (
    <Router>
      <div>
        <Navigation/>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/login" Component={Login}/>
          <Route path="/signup" Component={Signup}/>
          <Route path="/logout" Component={Logout}/>
          <Route path="/signup" Component={Signup}/>
          <Route path="/jobposting" Component={JobPostingForm}/>
          <Route path="/joblisting" Component={JobListing}/>
          <Route path="/yourjobs" Component={YourJobs}/>
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
