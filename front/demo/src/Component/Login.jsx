
import React, { useEffect, useState } from "react";
import "../styles/login.css";
import logingif from "../assests/login.gif";
import axios from "axios";
import swal from 'sweetalert';


const Login = () => {

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location = "/dashboard";
    }
  }
  , []);

    const handleChange = (e, field) => {
        setData({ ...data, [field]: e.target.value });
        };

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(data);
        axios
        .post("http://localhost:8080/user/login", data)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                
                localStorage.setItem("user", JSON.stringify(res.data));
                swal("Login Success", "success");
                window.location = "/dashboard";
            } else {
                swal("Login Failed", "error");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    

  return (
    <>
      
      <meta charSet="utf-8" />
      <div className="wrapper" style={{height: 'fit-content',margin:'50px 70px',paddingBottom:'20px' }}>
        <div className="formcont" style={{backgroundColor:'white',margin:'30px',padding:'20px'}}>
          <img class="logingif" src={logingif}  alt="" style={{marginTop:'-30px'}}/>

          <form className="loginform"  onSubmit={submitForm} style={{marginTop:'-20px',height:'400px',width:'350px'}} >
            <div className="title">Login</div>
            <div className="field">
              <input
                type="emailId"
                id="emailId"
                onChange={(e) => handleChange(e, "email")}
                value={data.email}
                required
                
              />
              
              <label>Email Address</label>
            </div>
            <div className="field">
              <input
                type="password"
                id="password"
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
                required
                
              />
              
              <label>Password</label>
            </div>
            
          
            <div className="field">
              <input type="submit" value="Login" />
            </div>
           
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
