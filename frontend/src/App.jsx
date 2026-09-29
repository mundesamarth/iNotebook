import {BrowserRouter, Routes ,Route} from "react-router"
import SignInPage from "./pages/signInPage"
import SignUpPage from "./pages/signUpPage"


const App = () => {
  return (

      <BrowserRouter>
      <Routes>
        <Route path="/signin" element = {<SignInPage/>} ></Route>
        <Route path="/signup" element = {<SignUpPage/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}
export default App
