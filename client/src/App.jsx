
import './App.css'
import { Home } from './components/Home';
import {Login} from "./components/Login";
import {Logout} from "./components/Logout";
import {Register} from "./components/Register";
import {Error} from "./components/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
