import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import VerifyEmailPage from "./pages/VerifyEmailPage"
import Navbar from "./components/Navbar"
import NotFoundPage from "./pages/NotFoundPage"

function App() {

  return (
    <>
        <BrowserRouter>
              
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/reset-password" element={<ResetPasswordPage/>}/>
              <Route path="/verify-email" element={<VerifyEmailPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
          </Routes>

        
        </BrowserRouter>
    </>
  )
}

export default App
