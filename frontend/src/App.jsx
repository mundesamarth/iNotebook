import {BrowserRouter, Routes ,Route, Link} from "react-router"
import SignInPage from "./pages/signInPage"
import SignUpPage from "./pages/signUpPage"


const App = () => {
  return (

      <BrowserRouter>
      <Routes>
        <Route path="/signin" element = {<SignInPage/>} ></Route>
        <Route path="/signup" element = {<SignUpPage/>}></Route>
      </Routes>

     <div className="text-6xl flex flex-col items-center justify-center min-h-screen gap-10 ">
       <h1 >Welcome to iNoteBook</h1>
       <Link className="text-3xl text-red-800" to='/signup'>Sign Up</Link>
     </div>
      </BrowserRouter>
  )
}
export default App
