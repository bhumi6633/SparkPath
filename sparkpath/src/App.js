import './App.css';
import Navbar from './components/navbar';
import Chatbot from './components/chatbot';
import SignUpIn from './components/sign-up-in';
import PostRide from './components/post-ride';
import FindARide from './components/find-a-ride';
import FoundRides from './components/found-rides';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [signIn, setSignIn] = useState(false);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/post" element={<PostRide />} />
          <Route path="/find-a-ride" element={<FindARide />} />
          <Route path="/found-rides" element={<FoundRides />} />
          <Route path="/home" element={<SignUpIn signIn={signIn} setSignIn={setSignIn}/>} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
