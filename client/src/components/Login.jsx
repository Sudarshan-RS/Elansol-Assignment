import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";



export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  
  const {storeTokenInLS, API} = useAuth();
  const URL = `${API}/api/auth/login`;
  
  // Handling the input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    setUser({
      ...user,
      [name]: value,
    });
  };
  
  // Handling form submit
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify(user),

      });

      const res_data = await response.json();
      console.log('res form server', res_data);
      if ((response.ok)) {
        // localStorage.setItem('token', res_data.token)
        storeTokenInLS(res_data.token)
        setUser({ email: "", password: "" });
        console.log('token',res_data.token);
        toast.success("Login successful")
        navigate("/home");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("login", error)
    }
  };

  return (
    <>
      <main>
        <section>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="/images/login.png"
                  alt="let's fill the login form"
                  width="500"
                  height="500"
                />
              </div>
              <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email..."
                      autoComplete="off"
                      required
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password..."
                      autoComplete="off"
                      required
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn-submit">
                    Login Now
                  </button>
                  <button className="btn-submit ms-2">
                  <Link to="/register">Register Here</Link>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
