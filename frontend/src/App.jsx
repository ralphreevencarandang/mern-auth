import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import VerifyEmailPage from "./pages/VerifyEmailPage"
import NotFoundPage from "./pages/NotFoundPage"
import  { AppContextProvider }  from "./context/AppContext"
function App() {

  return (
    <>
        <BrowserRouter>
          <AppContextProvider>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/reset-password" element={<ResetPasswordPage/>}/>
              <Route path="/verify-email" element={<VerifyEmailPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
          </AppContextProvider>

        
        </BrowserRouter>
    </>
  )
}

export default App
