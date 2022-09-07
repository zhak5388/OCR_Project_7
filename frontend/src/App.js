//import { BrowserRouter, BrowserRouter as Route, Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {React} from "react";
import AuthContextProvider from "./4_utils/AuthContext";
import LoginPage from "./2_pages/LoginPage";
import SignUpPage from "./2_pages/SignUpPage";
import NotFoundPage from "./2_pages/NotFoundPage";


function App() 
{
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact="true" element={<Navigate to="/login" />}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
