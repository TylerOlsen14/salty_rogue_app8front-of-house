import React from 'react';
import './App.css';
import NavBar from './components/AppNavbar'
import RecordList from './components/RecordList'

function App() {
  return (
    <div className="App">
      <NavBar />
      <RecordList />
    </div>
  );
}

export default App;
