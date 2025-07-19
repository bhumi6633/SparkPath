import './App.css';
import React, { useState, createContext, useContext } from 'react';
import Navbar from './components/navbar';
import Chatbot from './components/chatbot';
import SignUpIn from './components/sign-up-in';
import PostRide from './components/post-ride';
import FindARide from './components/find-a-ride';
import FoundRides from './components/found-rides';
import HomePage from './components/homepage';
import PostRideConfirm from './components/post-ride-confirm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// AuthContext and Provider
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostRide />} />
            <Route path="/find-a-ride" element={<FindARide />} />
            <Route path="/found-rides" element={<FoundRides />} />
            <Route path="/sign" element={<SignUpIn />} />
            <Route path="/confirm" element={<PostRideConfirm />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
