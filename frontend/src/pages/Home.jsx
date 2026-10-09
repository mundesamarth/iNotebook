import { useEffect } from "react";
import { useNavigate } from "react-router";

function Home() {
    const navigation = useNavigate()
    useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigation("/signin",{replace:true})
        }
    },[navigation])
  return <h1>Welcome Back to INoteBook , Mr</h1>;
}

export default Home;
