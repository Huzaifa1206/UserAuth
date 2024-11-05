import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Register from './Register';
import Login from './Login'
import Dashboard from "./Dashboard";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='Register' element={<Register/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
