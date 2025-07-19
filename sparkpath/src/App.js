import './App.css';
import Navbar from './components/navbar';
import Chatbot from './components/chatbot';
import SignUpIn from './components/sign-up-in';
import { useState } from 'react';

function App() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="App">
      <Navbar />
      <SignUpIn signIn={signIn} setSignIn={setSignIn}/>
      <Chatbot />
    </div>
  );
}

export default App;
