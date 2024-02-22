import './App.css';
import { Routes, Route } from 'react-router-dom';
import  Login  from './Component/Login';
import { Dashboard } from './Component/Dashboard';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </div>
    
  );
}

export default App;
