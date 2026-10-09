import { BrowserRouter, Routes, Route } from "react-router";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import Home from "./pages/Home";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
